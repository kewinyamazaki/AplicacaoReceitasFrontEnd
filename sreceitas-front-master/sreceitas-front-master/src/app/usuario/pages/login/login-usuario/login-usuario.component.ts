import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMapTo } from 'rxjs/operators';
import { MensagemComponent } from 'src/app/shared/components/mensagem/mensagem.component';
import { Mensagens } from 'src/app/shared/model/Mensagens';
import { Login } from 'src/app/usuario/model/Login';
import { UsuarioService } from 'src/app/usuario/service/usuario.service';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['/src/app/shared/styles/circulos-fundo.style.css','./login-usuario.component.css']
})
export class LoginUsuarioComponent implements OnInit {

  formLogin: FormGroup;
  confirmarEmail: boolean;
  campoObrigatorio:string = "*Campo obrigatório";
  credenciais="E-mail ou senha não conferem."

  @ViewChild('appMensagem') appMensagem: MensagemComponent;

  @Input('emailLogin') email: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private usuarioService: UsuarioService) {
                if (this.usuarioService.isLoggedIn()) this.router.navigate(['/usuario/perfil']);
                this.confirmarEmail = this.router.getCurrentNavigation()?.extras?.state?.confirmarEmail;
              }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.formLogin = this.formBuilder.group(
      {
        emailLogin: [null, Validators.required],
        senhaLogin: [null, Validators.required]
      }
    )
  }

  public irParaCadastro(){
    this.router.navigate(['/usuario/cadastrar'], {relativeTo:this.route.parent});
  }

  public entrar(){

    this.markFormGroupTouched(this.formLogin);

    if(this.formLogin.valid){
      let login = new Login();
      login.email = this.formLogin.get("emailLogin").value;
      login.senha = this.formLogin.get("senhaLogin").value;
      this.usuarioService.efetuarLogin(login).subscribe(
        sucesso => {
          this.router.navigate(['/landpage']).then(() => window.location.reload());
          this.usuarioService.setAuthStorage(sucesso);
        },
        erro => {
          if(erro.error.message == this.credenciais){
            this.appMensagem.apresentarMenssagemErro(erro.error.message);
          }
          else{
            this.appMensagem.apresentarMenssagemInfo(erro.error.message, true);
          }
        }
      );
    }
    else{
      this.markFormGroupTouched(this.formLogin);
    }
  }

  validaCampo(campo: string){
    return this.formLogin.get(campo).touched && this.formLogin.get(campo).invalid;
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}

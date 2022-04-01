import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagemComponent } from 'src/app/shared/components/mensagem/mensagem.component';
import { Mensagens } from 'src/app/shared/model/Mensagens';
import { Usuario } from 'src/app/usuario/model/Usuario';
import { UsuarioService } from 'src/app/usuario/service/usuario.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['/src/app/shared/styles/circulos-fundo.style.css','./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  formCadastro: FormGroup;
  calendarioTocado: boolean;
  hoje : Date;
  @ViewChild('appMensagem') appMensagem: MensagemComponent;

  campoObrigatorio:string = "*Campo obrigatório";

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private usuarioService: UsuarioService) {
                if (this.usuarioService.isLoggedIn()) this.router.navigate(['/usuario/perfil']);
                this.calendarioTocado = false
                this.hoje = new Date()
              }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.formCadastro = this.formBuilder.group(
      {
        nome: [null, Validators.required],
        email: [null, Validators.required],
        senha: [null, Validators.required],
        confirmaSenha: [null, Validators.required],
        dataNascimento: [null, Validators.required],
        endereco:[null, Validators.required]
      }
    )
  }

  public cadastrar(){

    this.markFormGroupTouched(this.formCadastro);
    this.calendarioTocado = true;

    if(this.formCadastro.valid){
      let usuario = new Usuario();

      let confirmaSenha = '';

      usuario.userId = null;
      usuario.nome = this.formCadastro.get("nome").value;
      usuario.email = this.formCadastro.get("email").value;
      usuario.senha = this.formCadastro.get("senha").value;
      usuario.endereco = this.formCadastro.get("endereco").value;
      usuario.dataNascimento = this.formCadastro.get("dataNascimento").value;
      confirmaSenha = this.formCadastro.get("confirmaSenha").value;

      if(this.verificarSenha()){
        console.log(usuario);
        if(usuario.senha == confirmaSenha){
        this.usuarioService.cadastrar(usuario).subscribe(
          sucesso => {
            this.router.navigate(['/usuario/login'], {state: {confirmarEmail: true}}).then(() =>
              this.appMensagem.apresentarMenssagemSucesso(Mensagens.MSG_CADASTRO_SUCESSO)
            );
          },
          erro => {
            this.appMensagem.apresentarMenssagemErro(erro.error.message);
            console.error(erro.error.message);
          }
        );
        }
        else{
          this.appMensagem.apresentarMenssagemErro(Mensagens.MSG_CONFIRMA_SENHA_INVALIDA);
          this.formCadastro.get("confirmaSenha").setValue("");
        }
      }
      }


  }

  public verificarSenha(): boolean{
    let senha: string;

    senha = this.formCadastro.get("senha").value;

    if(senha.length < 8){
      this.appMensagem.apresentarMenssagemErro(Mensagens.MSG_SENHA_TAMANHO_MINIMO);
      return false;
    }else{
      return true;
    }
  }

  irParaLogin(){
    this.router.navigate(['/usuario/login'], {relativeTo: this.route.parent});
  }


  validaCampo(campo: string){
    return this.formCadastro.get(campo).touched && this.formCadastro.get(campo).invalid;
  }

  validaData(campo: string){
    return this.formCadastro.get(campo).invalid;
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

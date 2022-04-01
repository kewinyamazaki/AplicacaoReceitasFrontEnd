import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/usuario/model/Usuario';
import { UsuarioService } from 'src/app/usuario/service/usuario.service';

@Component({
  selector: 'app-alterar-usuario',
  templateUrl: './alterar-usuario.component.html',
  styleUrls: ['./alterar-usuario.component.css']
})
export class AlterarUsuarioComponent implements OnInit {

  display: boolean = false;

  modal:FormGroup;

  usuario: Usuario;

  @Output('eventoAlteracao') eventoAlteracao = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.modal = this.formBuilder.group({
      nome: [null, Validators.required],
      endereco: [null, Validators.required],
      email: [null, Validators.required],
      dataNascimento: [null, Validators.required]
    })
  }

  alterar(): void{
    this.pegaValoresForm();
    this.usuarioService.alterar(this.usuario).subscribe(
      sucesso => {
        this.display = true;
        this.eventoAlteracao.emit();
      },
      erro => {
        console.error(erro);
      }
    )
  }

  pegaValoresForm(): void{
    this.usuario.nome = this.modal.get('nome').value;
    this.usuario.endereco = this.modal.get('endereco').value;
    this.usuario.email = this.modal.get('email').value;
    this.usuario.dataNascimento = this.modal.get('dataNascimento').value;
  }

  public apresentarModal(usuario: Usuario): void {
    this.display = true;
    this.usuario = usuario;
    this.modal.get('nome').setValue(usuario.nome);
    this.modal.get('endereco').setValue(usuario.endereco);
    this.modal.get('email').setValue(usuario.email);
    this.modal.get('dataNascimento').setValue(usuario.dataNascimento);
  }
}

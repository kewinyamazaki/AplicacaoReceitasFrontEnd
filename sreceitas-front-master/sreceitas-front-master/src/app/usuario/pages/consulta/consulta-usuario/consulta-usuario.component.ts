import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagemComponent } from 'src/app/shared/components/mensagem/mensagem.component';
import { Mensagens } from 'src/app/shared/model/Mensagens';
import { Usuario } from 'src/app/usuario/model/Usuario';
import { UsuarioService } from 'src/app/usuario/service/usuario.service';
import { AlterarUsuarioComponent } from '../../alterar/alterar-usuario/alterar-usuario.component';

@Component({
  selector: 'app-consulta-usuario',
  templateUrl: './consulta-usuario.component.html',
  styleUrls: ['./consulta-usuario.component.css']
})
export class ConsultaUsuarioComponent implements OnInit {

  usuarios: Usuario[];

  @ViewChild("appMensagem") appMensagem: MensagemComponent;
  @ViewChild("modalAlteracao") appModalAlteracao: AlterarUsuarioComponent;

  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private route: ActivatedRoute) { }



  ngOnInit(): void {
    this.carregarGridUsuarios();
  }

  private carregarGridUsuarios(): void{
    this.usuarioService.consultarTodos().subscribe(
      sucesso => {
        this.usuarios = sucesso;
        this.appMensagem.apresentarMenssagemSucesso(Mensagens.MSG_SUCESSO_BUSCA);
      },
      erro => {
        this.appMensagem.apresentarMenssagemInfo(erro = Mensagens.MSG_INFO_COMUNICACAO);
      }
    );
  }

  excluir(usuario: Usuario): void {
    this.usuarioService.deletarUsuario(usuario.userId).subscribe(
      sucesso => {
        this.appMensagem.apresentarMenssagemSucesso(Mensagens.MSG_USUARIO_REMOVIDO_SUCESSO);
        this.carregarGridUsuarios();
      },
      info => {
        this.appMensagem.apresentarMenssagemErro(info.error);
        console.log(usuario)
      }
    );
  }

  public abrirModal(usuario: Usuario): void {
    this.appModalAlteracao.apresentarModal(usuario);
  }

  public eventoAlteracao(): void{
    this.carregarGridUsuarios();
    this.appMensagem.apresentarMenssagemSucesso(Mensagens.MSG_OPERACAO_SUCESSO)
  }
}

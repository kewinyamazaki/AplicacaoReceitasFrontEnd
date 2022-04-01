import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MensagemComponent } from 'src/app/shared/components/mensagem/mensagem.component';
import { Mensagens } from 'src/app/shared/model/Mensagens';
import { Usuario } from 'src/app/usuario/model/Usuario';
import { UsuarioService } from 'src/app/usuario/service/usuario.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['/src/app/shared/styles/circulos-fundo.style.css','./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  usuario: Usuario;

  @ViewChild('appMensagem') appMensagem: MensagemComponent;

  constructor(private usuarioService: UsuarioService,
              private router: Router) { }

  ngOnInit(): void {
    if (!this.usuarioService.isLoggedIn())
      this.router.navigate(['/usuario/login']);
    this.montarPerfil();
  }

  montarPerfil(){
    this.usuarioService.montarPerfil().subscribe(
      data => {
        this.usuario = data;
        this.appMensagem.apresentarMenssagemSucesso(Mensagens.MSG_LOGIN_SUCESSO);
      }
    );
  }

  irParaFavoritos(){
    this.router.navigate(['/receita/favoritos-receita']);
  }
}

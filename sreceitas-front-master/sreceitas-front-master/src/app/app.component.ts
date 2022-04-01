import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { UsuarioService } from './usuario/service/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sisreceita-front';

  items: MenuItem[];

  constructor(private config: PrimeNGConfig,
              private router: Router,
              private route: ActivatedRoute,
              private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Início',
        routerLink:'landpage'
      },
      {
        label: 'Mercados',
        routerLink:'mapa/localizacao'
      },
      {
        label: 'Receitas',
        routerLink:'receita/consultar-receita'
      }
      // {
      //   label: 'Usuarios',
      //   routerLink:'usuario/consultar'
      // },
      // {
      //   label: 'Cadastro',
      //   routerLink:'usuario/cadastrar'
      // },
    ];
    this.usuarioService.isLoggedIn() && this.items.push({
      label: 'Enviar Receita',
      routerLink:'receita/publicar-receita'
    })

    this.config.setTranslation({
      accept: 'Aceitar',
      reject: 'Cancelar',
      dayNames : ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      dayNamesShort : ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      dayNamesMin : ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],
      monthNames : ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
      monthNamesShort : ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      today : "Hoje",
      choose: "Inserir foto",
      cancel: "Excluir",
      upload: "Enviar"
  });
  }

  mostrarPerfil() : void {
    this.router.navigate(['/usuario/perfil'], {relativeTo:this.route.parent});
  }

  telaInicial() : void {
    this.router.navigate(['/landpage'], {relativeTo:this.route.parent});
  }

  mostrarLogin() : void {
    this.router.navigate(['/usuario/login'], {relativeTo:this.route.parent});
  }

  isLoggedIn() : boolean {
    return this.usuarioService.isLoggedIn();
  }

  sair() : void {
    this.items.splice(this.items.length-1, 1)
    this.usuarioService.logout().then(() => window.location.reload());
  }

  isLandingPage() : boolean {
    return this.router.url === '/landpage';
  }
}

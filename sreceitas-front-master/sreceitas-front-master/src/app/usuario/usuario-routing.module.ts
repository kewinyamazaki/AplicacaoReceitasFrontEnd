import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroUsuarioComponent } from './pages/cadastro/cadastro-usuario/cadastro-usuario.component';
import { ConsultaUsuarioComponent } from './pages/consulta/consulta-usuario/consulta-usuario.component';
import { LoginUsuarioComponent } from './pages/login/login-usuario/login-usuario.component';
import { PerfilUsuarioComponent } from './pages/perfil/perfil-usuario/perfil-usuario.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginUsuarioComponent
  },
  {
    path: 'cadastrar',
    component: CadastroUsuarioComponent
  },
  {
    path: 'consultar',
    component: ConsultaUsuarioComponent
  },
  {
    path: 'perfil',
    component: PerfilUsuarioComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }

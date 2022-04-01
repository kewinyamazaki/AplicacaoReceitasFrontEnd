import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizacaoModule } from './localizacao/localizacao.module';
import { ReceitaModule } from './receita/receita.module';
import { LandpageModule } from './shared/components/landpage/landpage.module';
import { UsuarioModule } from './usuario/usuario.module';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'landpage',
    pathMatch: 'full'
  },
  {
    path: 'usuario',
    loadChildren:() => UsuarioModule
  },
  {
    path: 'receita',
    loadChildren:() => ReceitaModule
  },
  {
    path: 'landpage',
    loadChildren:() => LandpageModule
  },
  {
    path: 'mapa',
    loadChildren:() => LocalizacaoModule
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroReceitaComponent } from './pages/cadastro/cadastro-receita/cadastro-receita.component';
import { ConsultaReceitaComponent } from './pages/consulta/consulta-receita/consulta-receita.component';
import { FavoritarReceitaComponent } from './pages/favoritos/favoritos-receita/favoritos-receita.component';
import { VisualizarReceitaComponent } from './pages/visualizar/visualizar-receita/visualizar-receita.component';

const routes: Routes = [
  {
    path: 'publicar-receita',
    component: CadastroReceitaComponent
  },
  {
    path: 'consultar-receita',
    component: ConsultaReceitaComponent
  },
  {
    path: 'visualizar-receita',
    component: VisualizarReceitaComponent
  },
  {
    path: 'favoritos-receita',
    component: FavoritarReceitaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceitaRoutingModule { }

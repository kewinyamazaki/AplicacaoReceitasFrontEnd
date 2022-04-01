import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceitaRoutingModule } from './receita-routing.module';
import { CadastroReceitaComponent } from './pages/cadastro/cadastro-receita/cadastro-receita.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { FileUploadModule } from 'primeng/fileupload';
import { MensagemModule } from '../shared/components/mensagem/mensagem.module';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConsultaReceitaComponent } from './pages/consulta/consulta-receita/consulta-receita.component';
import { CardModule } from 'primeng/card';
import { ReceitaService } from './service/receita.service';
import { AlterarReceitaComponent } from './pages/alterar/alterar-receita/alterar-receita.component';
import { ChipsModule } from 'primeng/chips';
import { VisualizarReceitaComponent } from './pages/visualizar/visualizar-receita/visualizar-receita.component';
import { FavoritarReceitaComponent } from './pages/favoritos/favoritos-receita/favoritos-receita.component';
import { CardReceitaComponent } from './components/card-receita/card-receita.component';
import { UsuarioService } from '../usuario/service/usuario.service';
import {PaginatorModule} from 'primeng/paginator';

@NgModule({
  declarations: [CadastroReceitaComponent, ConsultaReceitaComponent, AlterarReceitaComponent, VisualizarReceitaComponent, FavoritarReceitaComponent, CardReceitaComponent],
  imports: [
    CommonModule,
    ReceitaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MensagemModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    DialogModule,
    ChipModule,
    FileUploadModule,
    InputNumberModule,
    DropdownModule,
    CardModule,
    ChipsModule,
    PaginatorModule
  ],
  providers: [
    ReceitaService,
    UsuarioService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReceitaModule { }

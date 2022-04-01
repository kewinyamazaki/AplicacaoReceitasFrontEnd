import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';

import { LoginUsuarioComponent } from './pages/login/login-usuario/login-usuario.component';
import { CadastroUsuarioComponent } from './pages/cadastro/cadastro-usuario/cadastro-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MensagemModule } from '../shared/components/mensagem/mensagem.module';
import { UsuarioService } from './service/usuario.service';
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ConsultaUsuarioComponent } from './pages/consulta/consulta-usuario/consulta-usuario.component';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { PasswordModule } from 'primeng/password';
import { FieldValidationModule } from '../shared/components/field-validation/field-validation.module';
import { DialogModule } from 'primeng/dialog';
import { AlterarUsuarioComponent } from './pages/alterar/alterar-usuario/alterar-usuario.component';
import { PerfilUsuarioComponent } from './pages/perfil/perfil-usuario/perfil-usuario.component';
import { DividerModule } from 'primeng/divider';
import {TooltipModule} from 'primeng/tooltip';

@NgModule({
  declarations: [LoginUsuarioComponent, CadastroUsuarioComponent, ConsultaUsuarioComponent, AlterarUsuarioComponent, PerfilUsuarioComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MensagemModule,
    MessageModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    TableModule,
    CalendarModule,
    PasswordModule,
    FieldValidationModule,
    DialogModule,
    DividerModule,
    TooltipModule
  ],
  providers:[UsuarioService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UsuarioModule { }

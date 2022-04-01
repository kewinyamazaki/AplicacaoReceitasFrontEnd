import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalizacaoRoutingModule } from './localizacao-routing.module';
import { LocalizacaoComponent } from './localizacao/localizacao.component';
import { InputTextModule } from 'primeng/inputtext';
import { GMapModule } from 'primeng/gmap';


@NgModule({
  declarations: [LocalizacaoComponent],
  imports: [
    CommonModule,
    InputTextModule,
    LocalizacaoRoutingModule,
    GMapModule
  ]
})
export class LocalizacaoModule { }

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensagemComponent } from './mensagem.component';
import { MessageService } from 'primeng/api';
import {ToastModule} from 'primeng/toast';



@NgModule({
  declarations: [MensagemComponent],
  imports: [
    CommonModule,
    ToastModule
  ],
  exports: [
    MensagemComponent
  ],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MensagemModule { }

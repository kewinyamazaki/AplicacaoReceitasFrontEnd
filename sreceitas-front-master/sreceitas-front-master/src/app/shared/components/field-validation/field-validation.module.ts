import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldValidationComponent } from './field-validation.component';
import {MessageModule} from 'primeng/message';


@NgModule({
  declarations: [FieldValidationComponent],
  imports: [
    CommonModule,
    MessageModule
  ],
  exports: [
    FieldValidationComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FieldValidationModule { }

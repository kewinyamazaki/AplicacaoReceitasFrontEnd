import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RodapeComponent } from './rodape.component';



@NgModule({
  declarations: [RodapeComponent],
  imports: [
    CommonModule
  ],
  exports: [
    RodapeComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RodapeModule { }

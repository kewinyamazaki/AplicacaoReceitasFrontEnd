import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandpageRoutingModule } from './landpage-routing.module';
import { LandpageComponent } from './landpage.component';


@NgModule({
  declarations: [LandpageComponent],
  imports: [
    CommonModule,
    LandpageRoutingModule
  ]
})
export class LandpageModule { }

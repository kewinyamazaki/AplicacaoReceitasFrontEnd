import { Component, Input, OnInit } from '@angular/core';
import { FormControlName } from '@angular/forms';

@Component({
  selector: 'app-field-validation',
  templateUrl: './field-validation.component.html',
  styleUrls: ['./field-validation.component.css']
})
export class FieldValidationComponent implements OnInit {


  @Input() control: FormControlName;

  constructor() { }

  ngOnInit(): void {
  }

  public validarPossuiErros(): boolean{
    return this.control.invalid;
  }

}

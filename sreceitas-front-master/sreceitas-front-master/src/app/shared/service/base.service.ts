import { HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor() { }

  public urlBase: string = 'https://sreceitas.herokuapp.com/v1/';

  public httpOptionsJson = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      }
    )
  }
}

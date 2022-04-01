import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landpage',
  templateUrl: './landpage.component.html',
  styleUrls: ['/src/app/shared/styles/circulos-fundo.style.css','./landpage.component.css']
})
export class LandpageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public irParaReceitas(): void {
    this.router.navigate(['receita/consultar-receita']);
  }
}

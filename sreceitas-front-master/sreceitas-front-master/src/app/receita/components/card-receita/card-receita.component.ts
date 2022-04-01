import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { UsuarioService } from 'src/app/usuario/service/usuario.service';
import { Receita } from '../../model/Receita';

@Component({
  selector: 'card-receita',
  templateUrl: './card-receita.component.html',
  styleUrls: ['./card-receita.component.css']
})
export class CardReceitaComponent implements OnInit {

  @Input() receita: Receita;
  @Output() favoritar: EventEmitter<Receita> = new EventEmitter();
  @Output() desfavoritar: EventEmitter<Receita> = new EventEmitter();
  @Output() visualizar: EventEmitter<Receita> = new EventEmitter();

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void { }

  onFavoritar() {
    if (this.receita.favorito) this.desfavoritar.emit(this.receita);
    else this.favoritar.emit(this.receita);
  }

  onVisualizar() {
    this.visualizar.emit(this.receita);
  }

  isLoggedIn() {
    return this.usuarioService.isLoggedIn();
  }
}

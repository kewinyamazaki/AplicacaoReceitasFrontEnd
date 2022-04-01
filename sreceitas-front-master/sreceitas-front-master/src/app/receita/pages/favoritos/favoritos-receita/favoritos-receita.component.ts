import { ChangeDetectorRef, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Receita } from 'src/app/receita/model/Receita';
import { ReceitaService } from 'src/app/receita/service/receita.service';
import { MensagemComponent } from 'src/app/shared/components/mensagem/mensagem.component';
import { Mensagens } from 'src/app/shared/model/Mensagens';
import { AlterarReceitaComponent } from 'src/app/receita/pages/alterar/alterar-receita/alterar-receita.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/service/usuario.service';
import { Paginacao } from 'src/app/shared/model/Paginacao';

@Component({
  selector: 'app-consulta-receita',
  templateUrl: './favoritos-receita.component.html',
  styleUrls: [
    '/src/app/shared/styles/circulos-fundo.style.css',
    '/src/app/shared/styles/pagina-base.style.css',
    './favoritos-receita.component.css'
  ]
})
export class FavoritarReceitaComponent implements OnInit {

  formInputIngredient: FormGroup;
  paginacao: Paginacao;
  totalRegistros: number = 0;

  constructor(private receitaService: ReceitaService,
              private usuarioService: UsuarioService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  receitas: Receita[];

  @ViewChild("appMensagem") appMensagem: MensagemComponent;
  @ViewChild("modalAlteracao") appModalAlteracao: AlterarReceitaComponent;

  ngOnInit(): void{
    if (!this.usuarioService.isLoggedIn())
      this.router.navigate(['/usuario/login']);
    this.paginacao = new Paginacao();
    this.carregarReceitas();
    this.formInputIngredient = this.formBuilder.group(
      {
        ingredientes: [null, Validators.required],
      }
    )
  }

  private carregarReceitas(): void{
    this.receitaService.listarFavoritos(this.paginacao).subscribe(
      sucesso => {
        this.receitas = sucesso.content;
        this.totalRegistros = sucesso.totalElements;
      },
      erro => {
        this.appMensagem.apresentarMenssagemInfo(erro = Mensagens.MSG_NENHUMA_RECEITA);
      }
    );
  }

  public visualizarReceita(receita){
    this.router.navigate(['receita/visualizar-receita'], {queryParams: {id: receita.idreceita}, state: {receita : receita}})
  }

  public removerFavorito(receita){
    this.receitaService.removerDosFavoritos(receita.idreceita).subscribe(
      sucesso => this.receitas = this.receitas.filter(r => r.idreceita !== sucesso),
      console.error
    );
  }

  public isTocado(): boolean{
    return this.formInputIngredient.touched;
  }

  public paginate(event: any): void{
    this.paginacao.numeroPaginas = event.page;
    this.paginacao.quantidadePorPaginas = event.rows;
    this.carregarReceitas();
  }
}

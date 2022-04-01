import { Component, OnInit, ViewChild } from '@angular/core';
import { Receita } from 'src/app/receita/model/Receita';
import { ReceitaService } from 'src/app/receita/service/receita.service';
import { MensagemComponent } from 'src/app/shared/components/mensagem/mensagem.component';
import { Mensagens } from 'src/app/shared/model/Mensagens';
import { AlterarReceitaComponent } from 'src/app/receita/pages/alterar/alterar-receita/alterar-receita.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Paginacao } from 'src/app/shared/model/Paginacao';

@Component({
  selector: 'app-consulta-receita',
  templateUrl: './consulta-receita.component.html',
  styleUrls: [
    '/src/app/shared/styles/circulos-fundo.style.css',
    '/src/app/shared/styles/pagina-base.style.css',
    './consulta-receita.component.css'
  ]
})
export class ConsultaReceitaComponent implements OnInit {

  formInputIngredient: FormGroup;
  paginacao: Paginacao;
  totalRegistros: number = 0;

  constructor(private receitaService: ReceitaService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  receitas: Receita[];

  @ViewChild("appMensagem") appMensagem: MensagemComponent;
  @ViewChild("modalAlteracao") appModalAlteracao: AlterarReceitaComponent;

  ngOnInit(): void{
    this.paginacao = new Paginacao();
    this.carregarReceitas();
    this.formInputIngredient = this.formBuilder.group(
      {
        ingredientes: [null, Validators.required],
      }
    )
  }

  private carregarReceitas(): void{
    this.receitaService.consultarTodos(this.paginacao).subscribe(
      sucesso => {
        this.receitas = sucesso.content;
        this.totalRegistros = sucesso.totalElements;
      },
      erro => {
        this.appMensagem.apresentarMenssagemInfo(erro = Mensagens.MSG_NENHUMA_RECEITA);
      }
    );
  }

  /* ---------- TO-DO: Implementar a lógica de pagniação para busca com filtro ---------- */
  public buscarReceitas(): void{
    if (!this.formInputIngredient.get('ingredientes').errors)
      this.receitaService.listaReceitasByIngredient(this.paginacao, this.formInputIngredient.get('ingredientes').value).subscribe(
        sucesso => {
          this.receitas = sucesso.content;
        },
        erro => {
          this.appMensagem.apresentarMenssagemInfo(erro = Mensagens.MSG_NENHUMA_RECEITA);
        }
      );
  }

  public visualizarReceita(receita){
    this.router.navigate(['receita/visualizar-receita'], {queryParams: {id: receita.idreceita}, state: {receita : receita}})
  }

  public favoritarReceita(receita){
    this.receitaService.adicionarAosFavoritos(receita.idreceita).subscribe(
      sucesso => this.receitas.find(r => r.idreceita === sucesso).favorito = true,
      console.error
    );
  }

  public removerFavorito(receita){
    this.receitaService.removerDosFavoritos(receita.idreceita).subscribe(
      sucesso => this.receitas.find(r => r.idreceita === sucesso).favorito = false,
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

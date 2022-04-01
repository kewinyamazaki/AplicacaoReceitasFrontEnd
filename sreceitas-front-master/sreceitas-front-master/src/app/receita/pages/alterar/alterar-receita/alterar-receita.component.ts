import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Receita } from 'src/app/receita/model/Receita';
import { ReceitaService } from 'src/app/receita/service/receita.service';

@Component({
  selector: 'app-alterar-receita',
  templateUrl: './alterar-receita.component.html',
  styleUrls: ['./alterar-receita.component.css']
})
export class AlterarReceitaComponent implements OnInit {

  display: boolean = false;

  modal: FormGroup;

  receita: Receita;

  @Output('eventoAlteracao') eventoAlteracao = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private receitaService: ReceitaService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void{
    this.modal = this.formBuilder.group({
      nome: [null, Validators.required],
      descricao: [null, Validators.required],
      modoPreparo: [null, Validators.required],
      tempoPreparo: [null, Validators.required],
      rendimento: [null, Validators.required],
      ingredientes: [null, Validators.required],
      informacoesAdicionais: [null]
    })
  }

  alterar(): void{
    this.pegaValoresForm();
    this.receitaService.alterar(this.receita).subscribe(
      sucesso => {
        this.display = true;
        this.eventoAlteracao.emit();
      },
      erro => {
        console.error(erro);
      }
    )
  }

  pegaValoresForm(): void{
    this.receita.nome = this.modal.get('nome').value;
    this.receita.descricao = this.modal.get('descricao').value;
    this.receita.modo_preparo = this.modal.get('modoPreparo').value;
    this.receita.tempo_preparo = this.modal.get('tempoPreparo').value;
    this.receita.rendimento = this.modal.get('rendimento').value;
    this.receita.ingredientes = this.modal.get('ingredientes').value;
    this.receita.informacoes_adicionais = this.modal.get('informacoesAdicionais').value;
  }

  public apresentarModal(receita: Receita): void {
    this.display = true;
    this.receita = receita;
    this.modal.get('nome').setValue(receita.nome);
    this.modal.get('descricao').setValue(receita.descricao);
    this.modal.get('modoPreparo').setValue(receita.modo_preparo);
    this.modal.get('tempoPreparo').setValue(receita.tempo_preparo);
    this.modal.get('rendimento').setValue(receita.rendimento);
    this.modal.get('ingredientes').setValue(receita.ingredientes);
    this.modal.get('informacoesAdicionais').setValue(receita.informacoes_adicionais);
  }
}

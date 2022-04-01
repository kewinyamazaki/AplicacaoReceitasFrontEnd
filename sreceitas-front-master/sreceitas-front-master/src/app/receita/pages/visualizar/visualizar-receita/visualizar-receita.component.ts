import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { AssocIngrediente } from 'src/app/receita/model/AssocIngrediente';
import { Comentario } from 'src/app/receita/model/Comentario';
import { Receita } from 'src/app/receita/model/Receita';
import { ReceitaService } from 'src/app/receita/service/receita.service';
import { MensagemComponent } from 'src/app/shared/components/mensagem/mensagem.component';
import { Mensagens } from 'src/app/shared/model/Mensagens';
import { UsuarioService } from 'src/app/usuario/service/usuario.service';
import { AlterarReceitaComponent } from '../../alterar/alterar-receita/alterar-receita.component';

@Component({
  selector: 'app-visualizar-receita',
  templateUrl: './visualizar-receita.component.html',
  styleUrls: ['/src/app/shared/styles/circulos-fundo.style.css',
              '/src/app/shared/styles/pagina-base.style.css',
              './visualizar-receita.component.css']
})
export class VisualizarReceitaComponent implements OnInit {

  formPublicarComentario: FormGroup;
  receita: Receita;
  comentarios: Comentario[];
  receitaAtualizando: Boolean = false;
  comentarioAtualizando: Number;

  @ViewChild("appMensagem") appMensagem: MensagemComponent;
  @ViewChild("modalAlteracao") appModalAlteracao: AlterarReceitaComponent;

  constructor(private formBuilder: FormBuilder,
              private receitaService: ReceitaService,
              private usuarioService: UsuarioService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

      let nav: Navigation = this.router.getCurrentNavigation();

      if (nav.extras && nav.extras.state && nav.extras.state.receita) {
        this.receita = nav.extras.state.receita as Receita;
      }
      else
        this.activatedRoute.queryParamMap.subscribe(
          paramMap => this.receitaService.consultar(Number.parseInt(paramMap.get('id'))).subscribe(
            receita => this.receita = receita,
            console.error
          ),
          console.error
        );
        this.carregarComentarios();
    }

  ngOnInit(): void {
    this.createForm();
    this.comentarios = [];
    this.comentarioAtualizando = -1;
  }

  createForm() {
    this.formPublicarComentario = this.formBuilder.group({
      comentario: [null],
      edicao: [null]
    })
  }

  ingredientePorExtenso(i: AssocIngrediente): string {
    return i.medida.formato.replace(/%(q|i)/g, (m,s) => { return s === 'q' ? i.quantidade.toString() : (i.plural !== null ? i.plural : i.ingrediente) });
  }

  private removerReceita(): void{
    this.receitaService.deletar(this.receita.idreceita).subscribe(
      sucesso => {
        this.appMensagem.apresentarMenssagemSucesso(Mensagens.MSG_RECEITA_REMOVIDO_SUCESSO);
        this.router.navigate(['/receita/consultar-receita']);
      },
      erro => {
        this.appMensagem.apresentarMenssagemErro(Mensagens.MSG_NENHUMA_RECEITA);
      }
    );
  }

  private atualizarReceita(): void{
    this.router.navigate(['/receita/publicar-receita/'], {state: {receita: this.receita}});
  }

  public eventoAlteracao(): void{
    this.appMensagem.apresentarMenssagemSucesso(Mensagens.MSG_OPERACAO_SUCESSO)
  }

  carregarComentarios() {
    this.activatedRoute.queryParamMap.subscribe(
      paramMap => this.receitaService.carregarComentarios(Number.parseInt(paramMap.get('id'))).subscribe(
        comentarios => {
          // console.log(comentarios);
          this.comentarios = comentarios
        },
        console.error
      ),
    );
  }

  comentar() {
    if (!this.formPublicarComentario.get("comentario").value) return;
    let comentario = new Comentario();
    comentario.conteudo = this.formPublicarComentario.get("comentario").value;
    comentario.receita = new Receita();
    comentario.receita.idreceita = this.receita.idreceita;
    this.receitaService.publicarComentarios(comentario).subscribe(
      sucesso => {
        // console.log(sucesso);
        this.comentarios.unshift(sucesso);
      },
      console.error
    );
    this.formPublicarComentario.get("comentario").setValue("");
  }

  removerComentario(id) {
    this.receitaService.deletarComentario(id).subscribe(
      sucesso => {
        this.comentarios = this.comentarios.filter(c => c.idcomentario !== sucesso);
        // this.carregarComentarios();
      },
      console.error
    );
  }

  isLoggedIn() {
    return this.usuarioService.isLoggedIn();
  }

  async atualizarComentario(comentario) {
  if (this.comentarioAtualizando === comentario.idcomentario) {
    if (this.formPublicarComentario.get("edicao").value !== null
        && this.formPublicarComentario.get("edicao").value !== '') {
      let comentarioEditado = comentario;
      comentarioEditado.conteudo = this.formPublicarComentario.get("edicao").value;
      await this.receitaService.alterarComentario(comentarioEditado).subscribe(
        sucesso => {
          comentario = this.formPublicarComentario.get("edicao").value;
          this.formPublicarComentario.get("edicao").setValue('');
        },
        console.error
        );
      }
    this.comentarioAtualizando = -1;
  } else
    this.comentarioAtualizando = comentario.idcomentario;
  }
}

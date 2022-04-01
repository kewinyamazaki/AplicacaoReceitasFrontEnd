import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Navigation, Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { AssocIngrediente } from 'src/app/receita/model/AssocIngrediente';
import { Medida } from 'src/app/receita/model/Medida';
import { Receita } from 'src/app/receita/model/Receita';
import { ReceitaService } from 'src/app/receita/service/receita.service';
import { MensagemComponent } from 'src/app/shared/components/mensagem/mensagem.component';
import { Mensagens } from 'src/app/shared/model/Mensagens';
import { UsuarioService } from 'src/app/usuario/service/usuario.service';

@Component({
  selector: 'app-cadastro-receita',
  templateUrl: './cadastro-receita.component.html',
  styleUrls: [
    '/src/app/shared/styles/circulos-fundo.style.css',
    '/src/app/shared/styles/pagina-base.style.css',
    './cadastro-receita.component.css'
  ]
})
export class CadastroReceitaComponent implements OnInit {

  formCadastroReceita: FormGroup;
  ingredientes: Map<Number,AssocIngrediente>;
  ingredientesArray: Array<Object>;
  ingredienteKey: number;
  medidas: Medida[];
  imagemB64: string;

  receita: Receita = new Receita();
  campoObrigatorio:string = "*Campo obrigatório";
  avisoParenteses: boolean = false;


  @ViewChild('appMensagem') appMensagem: MensagemComponent;

  constructor(private formBuilder: FormBuilder,
              private usuarioService: UsuarioService,
              private receitaService: ReceitaService,
              private router: Router) {
    this.ingredientes = new Map();
    this.ingredienteKey = 0;
    this.medidas = [
      {medida: "unidade(s)", formato: "%q %i", idmedida: 0},
      {medida: "1/2 unidade", formato: "%q/2 %i", idmedida: 1},
      {medida: "a gosto", formato: "%i a gosto", idmedida: 2},
      {medida: "grama(s)", formato: "%qg de %i", idmedida: 3},
      {medida: "quilograma(s)", formato: "%qkg de %i", idmedida: 4},
      {medida: "mililitro(s)", formato: "%qml de %i", idmedida: 5},
      {medida: "litro(s)", formato: "%qL de %i", idmedida: 6},
      {medida: "colher(es) de chá", formato: "%q colher(es) de chá de %i", idmedida: 7},
      {medida: "1/2 colher de chá", formato: "%q/2 colher de chá de %i", idmedida: 8},
      {medida: "colher(es) de sopa", formato: "%q colher(es) de sopa de %i", idmedida: 9},
      {medida: "1/2 colher de sopa", formato: "%q/2 colher de sopa de %i", idmedida: 10},
      {medida: "xícara(s) de chá", formato: "%q xícara(s) de chá de %i", idmedida: 11},
      {medida: "1/2 xícara de chá", formato: "%q/2 xícara de chá de %i", idmedida: 12},
      {medida: "lata(s)", formato: "%q lata(s) de %i", idmedida: 13}
    ];

    let nav: Navigation = this.router.getCurrentNavigation();
    if (nav.extras && nav.extras.state && nav.extras.state.receita)
      this.receita = nav.extras.state.receita;

  }

  ngOnInit(): void {
    if (!this.usuarioService.isLoggedIn())
      this.router.navigate(['/usuario/login']);

    this.createForm();

    if (this.modoAlteracao())
      this.carregarValoresAlteracao()
    this.atualizaArrayIngredientes();
  }

  modoAlteracao(): Boolean {
    return this.receita.idreceita != null;
  }

  createForm(){
    this.formCadastroReceita = this.formBuilder.group(
      {
        nomeReceita: [null, Validators.required],
        descricaoReceita: [null],
        modoPreparo: [null, Validators.required],
        tempoPreparo: [null, Validators.required],
        rendimento: [null, Validators.required],
        ingredientes: [null],
        medida: [null],
        quantidade: [null, ],
        informacoesAdicionais: [null],
        imagem: [null]
      }
    )
  }

  carregarValoresAlteracao() {
    this.formCadastroReceita.get("nomeReceita").setValue(this.receita.nome);
    this.formCadastroReceita.get("descricaoReceita").setValue(this.receita.descricao);
    if (this.receita.ingredientes) {
      this.ingredientes = this.receita.ingredientes.reduce((acc,e,i) => {
        e.ingrediente = e.plural || e.ingrediente;
        acc.set(i,e)
        return acc;
      }, new Map<Number,AssocIngrediente>());
      this.ingredienteKey = this.ingredientes.size;
    }
    this.formCadastroReceita.get("modoPreparo").setValue(this.receita.modo_preparo);
    this.formCadastroReceita.get("tempoPreparo").setValue(this.receita.tempo_preparo);
    this.formCadastroReceita.get("rendimento").setValue(this.receita.rendimento);
    this.formCadastroReceita.get("informacoesAdicionais").setValue(this.receita.informacoes_adicionais);
    this.imagemB64 = this.receita.imagem;
  }

  public adicionarIngrediente(){
    // TO-DO: Criar um form próprio para a inserção de ingredientes e usar o campo ".valid" ao invés de hard codar a lógica
    var algumCampoVazio = !this.formCadastroReceita.get("quantidade").value && this.formCadastroReceita.get("medida").value.medida.toLowerCase() !== "a gosto" ||
                          !this.formCadastroReceita.get("medida").value ||
                          !this.formCadastroReceita.get("ingredientes").value;
    if (algumCampoVazio) return;

    var unidadeSemParenteses = this.formCadastroReceita.get("medida").value.medida.toLowerCase() === "unidade(s)" &&
                               this.formCadastroReceita.get("ingredientes").value.indexOf('(') === -1;
    if (unidadeSemParenteses) {
      this.avisoParenteses = true;
      return;
    }
    else this.avisoParenteses = false;

    this.ingredientes.set(this.ingredienteKey++, {
      quantidade: this.formCadastroReceita.get("quantidade").value,
      medida: this.formCadastroReceita.get("medida").value,
      ingrediente: this.formCadastroReceita.get("ingredientes").value
    } as AssocIngrediente);
    this.formCadastroReceita.get("quantidade").setValue(null);
    this.formCadastroReceita.get("ingredientes").setValue(null);
    this.atualizaArrayIngredientes();
  }

  public removerIngrediente(key){
    this.ingredientes.delete(key);
    this.atualizaArrayIngredientes();
  }

  public atualizaArrayIngredientes(){
    this.ingredientesArray = new Array();
    this.ingredientes.forEach((e,k) => this.ingredientesArray.push({
      key: k,
      value: e.medida?.formato.replace(/%(q|i)/g, (m,s) => { return s === 'q' ? e.quantidade.toString() : e.ingrediente})
    }));
  }

  public validateFileSize($event: any, maxFileSize: number): void {
    if ($event.files[0].size > maxFileSize) {
      this.appMensagem.apresentarMenssagemInfo("O tamanho do arquivo excede o tmanho máximo");
    }
  }

  public onUpload(event) {
    this.toBase64(event.files[0]).subscribe(b64 => {
      this.imagemB64 = b64
    });
  }

  toBase64(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    return result;
  }

  async cadastrar() {
    this.markFormGroupTouched(this.formCadastroReceita);
    if(!this.formCadastroReceita.valid) return;
    let receita = new Receita();

    receita.idreceita = this.receita.idreceita;
    receita.verificada = this.receita.verificada || false;
    receita.nome = this.formCadastroReceita.get("nomeReceita").value;
    receita.descricao = this.formCadastroReceita.get("descricaoReceita").value;
    receita.ingredientes = Array.from(this.ingredientes.values());
    receita.modo_preparo = this.formCadastroReceita.get("modoPreparo").value;
    receita.tempo_preparo = this.formCadastroReceita.get("tempoPreparo").value;
    receita.rendimento = this.formCadastroReceita.get("rendimento").value;
    receita.informacoes_adicionais = this.formCadastroReceita.get("informacoesAdicionais").value;
    receita.imagem = this.imagemB64;

    console.log(receita.ingredientes);

    if (this.modoAlteracao())
      await this.receitaService.alterar(receita).subscribe(
        sucesso => {
          this.appMensagem.apresentarMenssagemSucesso(Mensagens.MSG_OPERACAO_SUCESSO);
          this.router.navigate(['/receita/visualizar-receita/'], {queryParams: {id: sucesso.idreceita}, state: {receita: sucesso}});
        },
        erro => {
          this.appMensagem.apresentarMenssagemErro(Mensagens.MSG_ERRO_RECEITA);
          console.error(erro);
        }
      );
    else
      await this.receitaService.cadastrar(receita).subscribe(
        sucesso => {
          this.appMensagem.apresentarMenssagemSucesso(Mensagens.MSG_OPERACAO_SUCESSO);
          this.router.navigate(['/receita/visualizar-receita/'], {queryParams: {id: sucesso.idreceita}, state: {receita: sucesso}});
        },
        erro => {
          this.appMensagem.apresentarMenssagemErro(Mensagens.MSG_ERRO_RECEITA);
          console.error(erro);
        }
      );
  }

  validaCampo(campo: string){
    return this.formCadastroReceita.get(campo).touched && this.formCadastroReceita.get(campo).invalid;
  }

  inverteCampoIngredientes(campo: string){
    return this.formCadastroReceita.get(campo).valid;
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}

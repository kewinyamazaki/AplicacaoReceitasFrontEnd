import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Pageable } from "src/app/shared/model/Paginable";
import { Paginacao } from "src/app/shared/model/Paginacao";
import { BaseService } from "src/app/shared/service/base.service";
import { Comentario } from "../model/Comentario";
import { Receita } from "../model/Receita";

@Injectable()
export class ReceitaService extends BaseService{

  constructor(protected http: HttpClient) {
    super();
  }

  public cadastrar(receita: Receita): Observable<Receita>{
    return this.http.post<Receita>(this.urlBase + 'receita', receita, this.httpOptionsJson);
  }

  public consultarTodos(paginacao: Paginacao){
    return this.http.post<Pageable>(this.urlBase + 'receita/listar', paginacao, this.httpOptionsJson);
  }

  public consultar(id: Number): Observable<Receita>{
    return this.http.get<Receita>(this.urlBase + 'receita/' + id, this.httpOptionsJson);
  }

  public deletar(id: Number): Observable<any>{
    return this.http.delete<any>(this.urlBase + 'receita/' + id, this.httpOptionsJson);
  }

  public alterar(receita: Receita): Observable<Receita>{
    return this.http.put<any>(this.urlBase + 'receita', receita, this.httpOptionsJson);
  }

  /* ---------- TO-DO: Ajustar para a lógica de paginação ---------- */
  public listaReceitasByIngredient(paginacao: Paginacao, ingredientes: Array<String>): Observable<{content: Receita[]}>{
    return this.http.post<{content: Receita[]}>(this.urlBase + 'receita/filtrar', {paginacao: paginacao, ingredientes: ingredientes}, this.httpOptionsJson);
  }

  // Favoritos
  public adicionarAosFavoritos(id: Number): Observable<Number>{
    return this.http.post<Number>(this.urlBase + 'receita/fav', {idreceita: id}, this.httpOptionsJson);
  }

  public listarFavoritos(paginacao: Paginacao): Observable<Pageable>{
    return this.http.post<Pageable>(this.urlBase + 'receita/fav/listar', paginacao, this.httpOptionsJson);
  }

  public removerDosFavoritos(id: Number): Observable<Number>{
    return this.http.delete<Number>(this.urlBase + 'receita/fav/' + id, this.httpOptionsJson);
  }

  // Comentários
  public publicarComentarios(comentario: Comentario): Observable<Comentario>{
    return this.http.post<Comentario>(this.urlBase + 'comentario', comentario, this.httpOptionsJson);
  }

  public carregarComentarios(id: Number): Observable<Comentario[]>{
    return this.http.get<Comentario[]>(this.urlBase + 'comentario/' + id, this.httpOptionsJson);
  }

  public alterarComentario(comentario: Comentario): Observable<Comentario>{
    return this.http.put<Comentario>(this.urlBase + 'comentario/', comentario, this.httpOptionsJson);
  }

  public deletarComentario(id: Number): Observable<Number>{
    return this.http.delete<Number>(this.urlBase + 'comentario/' + id, this.httpOptionsJson);
  }
}

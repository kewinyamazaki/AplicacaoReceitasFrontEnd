import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "ngx-webstorage";
import { Observable } from "rxjs";
import { BaseService } from "src/app/shared/service/base.service";
import { Login } from "../model/Login";
import { LoginResponse } from "../model/LoginResponse";
import { Usuario } from "../model/Usuario";
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseService{


  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    email: this.getEmail()
  }

  constructor(protected http: HttpClient,
              private localStorage: LocalStorageService) {
    super();
  }

  public cadastrar(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.urlBase + 'cadastrar', usuario, this.httpOptionsJson);
  }

  public efetuarLogin(login: Login): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.urlBase + 'login', login, this.httpOptionsJson);
  }

  public deletarUsuario(id: number): Observable<any>{
    return this.http.delete(this.urlBase + id, this.httpOptionsJson);
  }

  public consultarTodos(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.urlBase + 'listar', this.httpOptionsJson);
  }

  public alterar(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(this.urlBase + 'alterar', usuario, this.httpOptionsJson);
  }

  public encontrarPorEmail(email: string): Observable<any>{
    return this.http.get<Usuario>(this.urlBase + email, this.httpOptionsJson);
  }

  public montarPerfil(): Observable<any>{
    return this.http.get<Usuario>(this.urlBase + "conta", this.httpOptionsJson)
  }

  setAuthStorage(data: LoginResponse) {
    this.localStorage.store("autenticacaoToken", data.autenticacaoToken);
    this.localStorage.store("refreshToken", data.refreshToken);
    this.localStorage.store("expiraEm", data.expiraEm);
    this.localStorage.store("email", data.email);
    this.localStorage.store("nome", data.nome);
  }

  getJwtToken() { return this.localStorage.retrieve('autenticacaoToken'); }
  getEmail() { return this.localStorage.retrieve('email'); }
  getNome() { return this.localStorage.retrieve('nome'); }
  getRefreshToken() { return this.localStorage.retrieve('refreshToken'); }

  refreshToken(){
    return this.http.post<LoginResponse>(this.urlBase + 'refresh/token', this.refreshTokenPayload)
    .pipe(tap(response => {
      this.localStorage.clear('autenticacaoToken');
      this.localStorage.clear('expiraEm');
      this.localStorage.store('autenticacaoToken', response.autenticacaoToken);
      this.localStorage.store('expiraEm', response.expiraEm);
    }));
  }

  async logout() {
    this.http.post(this.urlBase + 'logout', this.refreshTokenPayload, {responseType: 'text'})
      .subscribe(data => {
        return Promise.resolve(data);
      }, error => {
        console.error(error);
      })
    this.localStorage.clear('autenticacaoToken');
    this.localStorage.clear('email');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiraEm');
    this.localStorage.clear('nome');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}

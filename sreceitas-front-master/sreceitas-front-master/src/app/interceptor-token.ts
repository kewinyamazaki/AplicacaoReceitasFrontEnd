import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, switchMap, take, filter } from 'rxjs/operators';
import { UsuarioService } from './usuario/service/usuario.service';
import { LoginResponse } from './usuario/model/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private usuarioService: UsuarioService) { }

  intercept(requisicao: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

    if (requisicao.url.indexOf('login') !== -1 ||
        requisicao.url.indexOf('refresh') !== -1 ) {
      return next.handle(requisicao);
    }

    const jwtToken = this.usuarioService.getJwtToken();
    if(jwtToken){
      requisicao = this.addToken(requisicao, jwtToken);
    }

    return next.handle(requisicao).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 403) {
        return this.handleAuthErrors(requisicao, next);
      } else {
        return throwError(error);
      }
    }));
  }

  private handleAuthErrors(requisicao: HttpRequest<any>, next: HttpHandler)
      : Observable<HttpEvent<any>> {
      if (!this.isTokenRefreshing) {
          this.isTokenRefreshing = true;
          this.refreshTokenSubject.next(null);

          return this.usuarioService.refreshToken().pipe(
              switchMap((refreshTokenResponse: LoginResponse) => {
                  this.isTokenRefreshing = false;
                  this.refreshTokenSubject
                      .next(refreshTokenResponse.autenticacaoToken);
                  return next.handle(this.addToken(requisicao,
                      refreshTokenResponse.autenticacaoToken));
              })
          )
      } else {
          return this.refreshTokenSubject.pipe(
              filter(result => result !== null),
              take(1),
              switchMap((res) => {
                  return next.handle(this.addToken(requisicao, res))
              })
          );
      }
  }

  addToken(requisicao: HttpRequest<any>, jwtToken: any){
    return requisicao.clone({headers: new HttpHeaders({Authorization: 'Bearer ' + jwtToken})});
  }
}

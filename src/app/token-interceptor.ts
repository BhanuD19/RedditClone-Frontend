import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {AuthService} from './auth/shared/auth.service';
import {Observable, throwError, BehaviorSubject} from 'rxjs';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {LoginResponse} from './auth/login/login-response.payload';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor{

  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(public authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.indexOf('refresh') !== -1 || req.url.indexOf('login') !== -1) {
      return next.handle(req);
    }
    const jwtToken = this.authService.getJwtToken();
    if (jwtToken) {
      return next.handle(this.addToken(req, jwtToken)).pipe(catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === 403){
          return this.handleAuthErrors(req, next);
        } else {
          return throwError(err);
        }
      }));
    }
    return next.handle(req);
  }

  private addToken(req: HttpRequest<any>, jwtToken: any) {
    return req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + jwtToken)
    });
  }

  private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isTokenRefreshing) {
      console.log('here to refresh token');
      this.isTokenRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(switchMap((refreshTokenResponse: LoginResponse) => {
        this.isTokenRefreshing = false;
        console.log('In handle auth errors, we recived this token:', refreshTokenResponse);
        this.refreshTokenSubject.next(refreshTokenResponse.authenticationToken);
        return next.handle(this.addToken(req, refreshTokenResponse.authenticationToken));
      }));
    } else {
      return this.refreshTokenSubject.pipe(
        filter(result => result !== null),
        take(1),
        switchMap(res => {
          return next.handle(this.addToken(req, this.authService.getJwtToken()));
        })
      );
    }
  }
}

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
// import { CommonService } from '../core/common.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  constructor(private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('token');
    const userid = localStorage.getItem('userId');
    if (authToken && userid) {
      req = req.clone({
        headers: req.headers.set('Authorization', authToken).set('UserId', userid)
      });
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // this.service.showSnackbar("Unauthorized access. Please log in again.");
          this.router.navigate(['login']);
          return throwError(error);
        } else {
          console.error('HTTP error:', error);
        }
        return throwError(error);
      })
    );
  }
}

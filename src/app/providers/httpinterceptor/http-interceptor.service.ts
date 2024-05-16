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
    console.log('http---14---');
    const authToken = localStorage.getItem('token');
    const userid = localStorage.getItem('user_id');
    if (authToken && userid) {
      console.log('http---14---');
      req = req.clone({
        headers: req.headers.set('Authorization', authToken).set('UserId', userid)
      });
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('http---25---');
        if (error.status === 401) {
          console.log('http---27---');
          // this.service.showSnackbar("Unauthorized access. Please log in again.");
          this.router.navigate(['login']);
          return throwError(error);
        } else {
          console.log('http---32---');
          console.error('HTTP error:', error);
        }
        console.log('http---35---');
        return throwError(error);
      })
    );
  }
}

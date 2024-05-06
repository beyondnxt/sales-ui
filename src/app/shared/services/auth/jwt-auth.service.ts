import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class JwtAuthService {
  return!: string;

  constructor(
    private route: ActivatedRoute,
    private jwtService: JwtHelperService
  ) {
    this.route.queryParams.subscribe(
      (params) => (this.return = params['return'] || '/')
    );
  }

  getJwtToken() {
    let token: any = localStorage.getItem('access_token');
    let HTTP_OPTIONS = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + token,
      }),
    };

    return HTTP_OPTIONS;
  }

  decodeJwtToken() {
    return this.jwtService.decodeToken(this.getToken());
  }
  getToken() {
    let token: any =localStorage.getItem('access_token');
    return token;
  }

  isLoggedIn(): Boolean {
    return !!this.getJwtToken();
  }
}

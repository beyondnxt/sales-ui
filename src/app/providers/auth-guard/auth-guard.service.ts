import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(public router: Router) { }

  canActivate(): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');  
    if(token){ 
      return true; 
    }else{
      return false; 
    }
  }

}

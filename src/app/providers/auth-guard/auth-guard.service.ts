import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(public router: Router) { }

  canActivate(): boolean {
    console.log('auth--12-----');
    if (!this.isAuthenticated()) {
      console.log('auth--14-----');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token'); 
    console.log('auth-guard-------', token); 
    if(token){ 
      return true; 
    }else{
      return false; 
    }
  }

}

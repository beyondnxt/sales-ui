import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(public router: Router) { }

  canActivate(): boolean {
    console.log("12----", this.isAuthenticated());
    if (!this.isAuthenticated()) {
        console.log("not authenticated");
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  public isAuthenticated(): boolean {
    // console.log("authToken after removal:", localStorage.getItem('authToken'));
    const token = localStorage.getItem('token');  
    console.log("24------", token);
    if(token){ 
      return true; 
    }else{
      return false; 
    }
  }

}

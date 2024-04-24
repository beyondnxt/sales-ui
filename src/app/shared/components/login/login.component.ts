import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/providers/admin/admin.service';
import { CommonService } from 'src/app/providers/core/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router :Router, private fb: FormBuilder, private adminService: UsersService, private service:CommonService){}
  signInForm = this.fb.group({
    email: ['', Validators.required], // Add required validator for username
    password: ['', Validators.required] // Add required validator for password
  });

  ngOnInit(){
    console.log('login')
   }
   signIn(){
    this.signInForm.markAllAsTouched();
    if(this.signInForm.invalid){
      return;
    }else{
      const payload = this.signInForm.getRawValue();
      this.adminService.login(payload).subscribe({
        next: (res) => {
          this.setLocalStorage(res);
        },
        error: (err) => {
          this.service.showSnackbar(err.error.message);
        },
        complete: () => {
          this.service.showSnackbar("Loggedin Successfully");
        }
      })
    }
    // this.router.navigate(['/dashboard'])
   }

   setLocalStorage(res: any){
    localStorage.setItem('userId', res?.userId);
    localStorage.setItem('token', res?.token);
    localStorage.setItem('roleId', res?.roleId);
    localStorage.setItem('firstName', res?.firstName);
    res?.roleId && this.router.navigate(['dashboard']);
  }

}

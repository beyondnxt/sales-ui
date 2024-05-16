import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/providers/admin/admin.service';
import { CommonService } from 'src/app/providers/core/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('topToBottomAnimation', [
      state(
        'void',
        style({
          transform: 'translateY(-100%)',
          opacity: 0,
        })
      ),
      state(
        '*',
        style({
          transform: 'translateY(0)',
          opacity: 1,
        })
      ),
      transition('void => *', [animate('0.2s ease-in')]),
    ]),
  ],
})
export class LoginComponent {
  loadingSpinner: boolean = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private adminService: UsersService,
    private service: CommonService
  ) { }
  signInForm = this.fb.group({
    email: ['', Validators.required], // Add required validator for username
    password: ['', Validators.required], // Add required validator for password
  });

  ngOnInit() {
  }

  signInResponseMsg!: string;
  showSignInResMsg: boolean = false;
  signIn() {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
    } else {
      this.loadingSpinner = true;
      const payload = this.signInForm.getRawValue();
      this.adminService.login(payload).subscribe({
        next: (res) => {
          console.log('loginComp----------', res);
          this.loadingSpinner = false;
          if (res.token) {
            console.log('loginComp-----61-----');
            localStorage.setItem('user_id', res.userId);
            localStorage.setItem('user_name', res.userName);
            localStorage.setItem('role_id', res.roleId);
            localStorage.setItem('role_name', res.roleName);
            localStorage.setItem('token', res.token);
            this.router.navigate(['/dashboard']);
            this.service.showSnackbar('LoggedIn Succcessfully');
          } else {
            console.log('loginComp-----70-----');
            this.loadingSpinner = false;
            this.showSignInResMsg = true;
            this.signInResponseMsg = res.message;
            localStorage.clear();
          }
        },
        error: (err) => {
          console.log('loginComp-----78-----');
          this.loadingSpinner = false;
          this.showSignInResMsg = true;
          this.signInResponseMsg = err.error.message;
          localStorage.clear();
          throw err;
        }
      });
    }
  }
}

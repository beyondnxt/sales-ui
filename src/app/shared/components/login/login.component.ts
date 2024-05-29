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
          // console.log('58------', res);
          this.loadingSpinner = false;
          if (res.data.token) {
            console.log('61------', res);
            localStorage.setItem('user_id', res.data.userId);
            localStorage.setItem('user_name', res.data.userName);
            localStorage.setItem('role_id', res.data.roleId);
            localStorage.setItem('role_name', res.data.roleName);
            localStorage.setItem('token', res.data.token);
            this.router.navigate(['/dashboard']);
            this.service.showSnackbar('LoggedIn Succcessfully');
          } else {
            // console.log('70------', res);
            this.loadingSpinner = false;
            this.showSignInResMsg = true;
            this.signInResponseMsg = res.message;
            localStorage.clear();
          }
        },
        error: (err) => {
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

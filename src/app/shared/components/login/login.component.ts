import { trigger, state, style, transition, animate } from '@angular/animations';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/providers/admin/admin.service';
import { CommonService } from 'src/app/providers/core/common.service';
import { RolesService } from 'src/app/providers/roles/roles.service';
import { navBarData } from '../side-nav/nav-data';

interface sideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

interface NavData {
  routerlink: string;
  icon: string;
  label: string;
  menu: string;
}

interface MenuList {
  menu_visibility: boolean;
  menuName: string;
  permissions: {
    write: boolean;
    delete: boolean;
  };
}

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
  menuLists: MenuList[] = [];
  filteredNavData: NavData[] = [];
  navData: NavData[] = navBarData;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private adminService: UsersService,
    private _roleApiService: RolesService,
    private service: CommonService,
    private _cdRef: ChangeDetectorRef
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
            localStorage.setItem('user_id', res.data.userId);
            localStorage.setItem('user_name', res.data.userName);
            localStorage.setItem('role_id', res.data.roleId);
            localStorage.setItem('role_name', res.data.roleName);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('last_name', res.data.lastName);
            this.triggerRoleAPI();
            // this.router.navigate(['/dashboard']);
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

  triggerRoleAPI() {
    // Role API
    let roleId: any = localStorage.getItem('role_id');
    this._roleApiService.getRoleById(roleId).subscribe({
      next: (res) => {
        this.menuLists = res.menuAccess;
        this.filterNavData();
        this._cdRef.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  filterNavData() {
    this.filteredNavData = this.navData.filter((navItem: any) => {
      const menu = this.menuLists.find(menuItem => menuItem.menuName === navItem.menu);
      return menu ? menu.menu_visibility : false;
    });
    this.router.navigate([`/${this.filteredNavData[0].routerlink}`]);
  }

}

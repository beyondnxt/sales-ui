import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { navBarData } from './nav-data';
import { Router } from '@angular/router';
import { RolesService } from 'src/app/providers/roles/roles.service';

interface sideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<sideNavToggle> = new EventEmitter();
  collapsed = true;
  screenWidth = 0;
  navData = navBarData;
  loggedInUserName: string | null = '';
  loggedInUserRole: string | null = '';
  menuLists: any[] = [];

  @HostListener('window:resize', ['$event'])
  onreSize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  constructor(
    private router: Router,
    private _roleApiService: RolesService,
    private _cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loggedInUserName = localStorage.getItem('user_name');
    this.loggedInUserRole = localStorage.getItem('role_name');
    this.screenWidth = window.innerWidth;

    this.triggerRoleAPI();
  }
  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }
  closeSideNav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isMenuVisibility(data: any, index: any): boolean {
    if (
      data.menu == this.menuLists[index]?.menuName &&
      !this.menuLists[index]?.menu_visibility &&
      this.menuLists.length > 0 &&
      this.menuLists != null
    ) {
      return true;
    } else {
      return false;
    }
  }

  triggerRoleAPI() {
    // Role API
    console.log('called');

    let roleId: any = localStorage.getItem('role_id');
    this._roleApiService.getRoleById(roleId).subscribe({
      next: (res) => {
        this.menuLists = res.menuAccess;
        console.log(this.menuLists);
        
        this._cdRef.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

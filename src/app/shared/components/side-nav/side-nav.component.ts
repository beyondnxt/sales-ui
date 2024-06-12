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
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<sideNavToggle> = new EventEmitter();
  collapsed = true;
  screenWidth = 0;
  navData: NavData[] = navBarData;
  loggedInUserName: string | null = '';
  loggedInUserRole: string | null = '';
  menuLists: MenuList[] = [];
  filteredNavData: NavData[] = [];
  

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

  // isMenuVisibility(data: any, index: any): boolean {
  //   console.log('111');
  //   if (
  //     data.menu == this.menuLists[index]?.menuName &&
  //     !this.menuLists[index]?.menu_visibility &&
  //     this.menuLists.length > 0 &&
  //     this.menuLists != null
  //   ) {
  //     console.log('true');
  //     return true;
  //   } else {
  //     console.log('false');
  //     return false;
  //   }
  // }

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
  }

}

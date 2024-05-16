import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { navBarData } from './nav-data';
import { Router } from '@angular/router';
import { WebSocketService } from 'src/app/providers/web-socket/web-socket.service';

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
  notifyCount = 0;
  @Output() onToggleSideNav: EventEmitter<sideNavToggle> = new EventEmitter();
  collapsed = true;
  screenWidth = 0;
  navData = navBarData;
  loggedInUserName: string | null = '';
  loggedInUserRole: string | null = '';

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
    private webSocketService: WebSocketService
  ) {
  }

  ngOnInit() {
    this.loggedInUserName = localStorage.getItem('user_name');
    this.loggedInUserRole = localStorage.getItem('role_name');
    this.screenWidth = window.innerWidth;
    this.getPendingApproal();
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

  getPendingApproal(){
    this.webSocketService.pendingApprovalNotification().subscribe(
      {
        next: (res: any) => {
          this.notifyCount = res.count;
        },
        error: (err) => {
          console.log(err);
         },
        complete: () => {
       }
      }
    );
  }

  redirectToApprovalPage(){

  }
}

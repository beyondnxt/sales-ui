import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface sideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  constructor(public router: Router){}
  isSideNavCollapsed = true;
  screenWidth = 0
  
  onToggleSideNav(data:sideNavToggle): void{
  this.screenWidth = data.screenWidth;
  this.isSideNavCollapsed = data.collapsed;
  }
}

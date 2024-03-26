import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnChanges {
  @Input() collapsed = true;
  @Input() screenWidth = 0;
  isTrimmed: boolean = false;
  getBodyClass() {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      return styleClass = 'body-trimmed';
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      return styleClass = 'body-md-screen';
    }
    return 'body-trimmed';
  }

  ngOnChanges(changes: SimpleChanges) {
    this.isTrimmed = changes['collapsed'].currentValue;
  }
}

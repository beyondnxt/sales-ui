import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sales-btn',
  templateUrl: './sales-btn.component.html',
  styleUrls: ['./sales-btn.component.scss']
})
export class SalesBtnComponent {
  @Input() label = '';
  @Output() action = new EventEmitter();
}

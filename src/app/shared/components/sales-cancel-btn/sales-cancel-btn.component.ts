import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sales-cancel-btn',
  templateUrl: './sales-cancel-btn.component.html',
  styleUrls: ['./sales-cancel-btn.component.scss']
})
export class SalesCancelBtnComponent {
  @Input() label = '';

}

import { Component } from '@angular/core';
import { AddFeedbackComponent } from '../add-feedback/add-feedback.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {
  constructor(private dialog: MatDialog) { }
  addFeedBack(){
    this.dialog.open(AddFeedbackComponent, {
      width: '500px',
      height: 'max-content',
      disableClose: true,
      panelClass: 'task-dialog-container',
    }).afterClosed().subscribe((res:any) => {
      if(res){
      }
    });
  }
}

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import * as data from './task-data';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  constructor(private dialog: MatDialog) { }
  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;
  addTask(){
    this.dialog.open(AddTaskComponent, {
      width: '500px',
      height: 'max-content',
      disableClose: true,
      panelClass: 'task-dialog-container',
    }).afterClosed().subscribe((res) => {
      if(res){
      }
    });
  }
}

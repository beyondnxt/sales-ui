import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import * as data from './task-data';
import { TasksService } from 'src/app/providers/tasks/tasks.service';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  constructor(private dialog: MatDialog, private taskService: TasksService) { }

  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;
  tab = 'status=unassigned';
  ngOnInit() {
    this.getDataBasedOnTabSelection(this.tab);
  }

  addTask() {
    this.dialog.open(AddTaskComponent, {
      width: '500px',
      height: 'max-content',
      disableClose: true,
      panelClass: 'task-dialog-container',
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.saveNewTask(res);
      }
    });
  }

  saveNewTask(payload: any) {
    this.taskService.postTask(payload).subscribe({
      next: (res) => {
        this.getDataBasedOnTabSelection(this.tab);
      }, error: (err) => {
      },
      complete: () => {
      }
    })
  }

  loadData(tab: any) {
    this.tableValues = [];
    switch (tab) {
      case 'unassigned':
        this.tab = 'status=' + tab;
        this.tableHeaders = data.tableHeaders;
        break;
      case 'assigned':
        this.tab = 'status=' + tab;
        this.tableHeaders = data.tableHeaders;
        break;
      case 'completed':
        this.tab = 'status=' + tab;
        this.tableHeaders = data.tableHeadersForCompleted;
        break;
      case 'verified':
        this.tab = 'status=' + tab;
        this.tableHeaders = data.tableHeaders;
        break;
      default:
    }
    this.getDataBasedOnTabSelection(this.tab);
  }

  getDataBasedOnTabSelection(tab: any) {
    this.taskService.getTaskList(tab).subscribe({
      next: (res) => {
        this.tableValues = res.data;
      }, error: (err) => {
      },
      complete: () => {
      }
    })
  }
  delete(data: any) {
    this.dialog.open(DeleteComponent, {
      width: '500px',
      height: 'max-content',
      disableClose: true,
      panelClass: 'delete-dialog-container',
      data: data,
    }).afterClosed().subscribe((res: any) => {
      if (res) {
        this.deleteUser(res);
      }
    });
  }
  deleteUser(id: any){
    this.taskService.deleteTask(id).subscribe({
      next: (res) => {
        this.getDataBasedOnTabSelection(this.tab);
      }, error: (err) => {
      },
      complete: () => {
      }
    })
  }

  edit(data: any) {
    this.dialog.open(AddTaskComponent, {
      width: '500px',
      height: 'max-content',
      disableClose: true,
      panelClass: 'user-dialog-container',
      data:data,
    }).afterClosed().subscribe((result: any[]) => {
      if (result && result.length === 2) {
        const userDetails = result[0];
        const dataId = result[1];
        this.updateTask(userDetails, dataId);
      }
    });
  }

  updateTask(payload: any, id: any) {
    this.taskService.updateTask(id, payload).subscribe({
      next: (res) => {
        this.getDataBasedOnTabSelection(this.tab);
      }, error: (err) => {
      },
      complete: () => {
      }
    })
  }
}

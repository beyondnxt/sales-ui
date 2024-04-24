import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import * as data from './task-data';
import { TasksService } from 'src/app/providers/tasks/tasks.service';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { SalesTableComponent } from 'src/app/shared/components/sales-table/sales-table.component';
import { CommonService } from 'src/app/providers/core/common.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  changeTab: any;
  constructor(private dialog: MatDialog, private taskService: TasksService, private service:CommonService) { }
  @ViewChild('childRef') saledData!: SalesTableComponent;
  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;
  selectedIds: any = [];
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
        this.service.showSnackbar("Task Created Successfully");
        this.getDataBasedOnTabSelection(this.tab);
      }, error: (err) => {
        this.service.showSnackbar(err.error.message);
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
        this.changeTab = '';
        break;
      case 'assigned':
        this.tab = 'status=' + tab;
        this.tableHeaders = data.tableHeaders;
        this.changeTab = '';
        break;
      case 'completed':
        this.tab = 'status=' + tab;
        this.tableHeaders = data.tableHeadersForCompleted;
        this.changeTab = tab;
        break;
      case 'verified':
        this.tab = 'status=' + tab;
        this.tableHeaders = data.tableHeaders;
        this.changeTab = '';
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
        this.service.showSnackbar("Task Deleted Successfully");
        this.getDataBasedOnTabSelection(this.tab);
      }, error: (err) => {
        this.service.showSnackbar(err.error.message);
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
        this.service.showSnackbar("Task Updated Successfully");
        this.getDataBasedOnTabSelection(this.tab);
      }, error: (err) => {
        this.service.showSnackbar(err.error.message);
      },
      complete: () => {
      }
    })
  }
  selectAll(data: any){
    data.forEach((item: any) => {
      const index = this.selectedIds.indexOf(item);
      index === -1 ? this.selectedIds.push(item) : this.selectedIds.splice(index, 1);
    });
  }
  getIds(ids: any){
    const index = this.selectedIds.indexOf(ids);
    index === -1 ? this.selectedIds.push(ids) : this.selectedIds.splice(index, 1);

    // console.log('155------', this.selectedIds);
    if (this.selectedIds.length == this.saledData.tableValues.length) {
      this.saledData.isSelectAll = true;
    } else {
      this.saledData.isSelectAll = false;
    }
  }
  Verify(){
    this.taskService.verifyTask(this.selectedIds).subscribe({
      next: (res) => {
        this.service.showSnackbar("Verified Successfully");
        this.getDataBasedOnTabSelection(this.tab);
      },
      error: (err: any) => {
        this.service.showSnackbar(err.error.message);
      },
      complete: () => {

      }
    })
  }
}

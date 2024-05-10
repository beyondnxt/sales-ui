import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import * as data from './task-data';
import { TasksService } from 'src/app/providers/tasks/tasks.service';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { SalesTableComponent } from 'src/app/shared/components/sales-table/sales-table.component';
import { CommonService } from 'src/app/providers/core/common.service';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  customerNamePlaceholder: string = 'Customer Name...';
  changeTab: any = 'unassigned';
  pageCount: any;
  totalCount = 0;
  currentPage = 0;
  count = 0;
  searchQuery = '';
  apiLoader = false;
  showFilter: boolean = false;
  showOrHide = false;
  date = '';
  cusSearch = '';
  cbSearch = '';
  atSearch = '';
  ttSearch = '';
  pageSize = this.service.calculatePaginationVal();
  @ViewChild('fromDateInput') fromDateInput!: ElementRef<HTMLInputElement>;
  taskType = [
    { id: 1, name: 'Lead' },
    { id: 2, name: 'Call Back' },
    { id: 3, name: 'Service' }
  ];
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
        this.changeTab = tab;
        break;
      case 'assigned':
        this.tab = 'status=' + tab;
        this.tableHeaders = data.tableHeadersForAssigned;
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
        case 'visit':
        this.tab = 'status=' + tab;
        this.tableHeaders = data.tableHeadersForVisit;
        this.changeTab = tab;
        break;
      default:
    }
    this.getDataBasedOnTabSelection(this.tab);
  }

  getDataBasedOnTabSelection(tab: any) {
    this.showOrHide = false;
    this.apiLoader = true;
    let query = `?pageSize=${this.pageSize}&page=${isNaN(this.currentPage) ? 1 : this.currentPage + 1}`
    this.taskService.getTaskList(tab, query, this.searchQuery,this.cusSearch, this.cbSearch, this.atSearch, this.ttSearch, this.date).subscribe({
      next: (res) => {
        !res.data.length && (this.showOrHide = true);
        this.apiLoader = false;
        this.tableValues = res.data;
        this.count = res.fetchedCount;
      }, error: (err) => {
        this.apiLoader = false;
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
  pagination(event: any): void {
    this.currentPage = event;
    this.getDataBasedOnTabSelection(this.tab);
  }
  searchBox(event: any){
    this.searchQuery = `&customerName=${event}`;
    (event) && ( this.currentPage = 0);
    this.currentPage = 0;
    this.getDataBasedOnTabSelection(this.tab);
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  onFromDateChange(event: any){
    this.date = this.dateFormat(event.value);
    this.getDataBasedOnTabSelection(this.tab);
  }

  dateFormat(date: any) {
    if (date != null) {
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    }
    else {
      return date;
    }
  }

  customerSearch(event: any){
    this.cusSearch = `&customerName=${event}`;
    this.filterAll();
  }
  createdbySearch(event: any){
    this.cbSearch = `&createdBy=${event}`;
    this.filterAll();
  }
  assignedToSearch(event: any){
    this.atSearch = `&assignToName=${event}`;
    this.filterAll();
  }

  gettaskType(event: any){
    this.ttSearch = `&taskType=${event.value}`;
    this.filterAll();
  }

  filterAll(){
    this.currentPage = 0;
    this.getDataBasedOnTabSelection(this.tab);
  }

  comments(data: any){
    this.dialog.open(CommentsComponent, {
      width: '500px',
      height: 'max-content',
      disableClose: true,
      panelClass: 'delete-dialog-container',
      data: data,
    }).afterClosed().subscribe((res: any) => {
      if (res) {
        this.getDataBasedOnTabSelection(this.tab);
      }
    });
  }
  onRefreshClick(){
    this.customerNamePlaceholder = 'Customer Name...';
    console.log('280----', this.customerNamePlaceholder);
    this.cusSearch = this.cbSearch = this.atSearch = this.ttSearch = this.date = '';
    this.getDataBasedOnTabSelection(this.tab);
  }
}

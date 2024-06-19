import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import * as data from './task-data';
import { TasksService } from 'src/app/providers/tasks/tasks.service';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { SalesTableComponent } from 'src/app/shared/components/sales-table/sales-table.component';
import { CommonService } from 'src/app/providers/core/common.service';
import { CommentsComponent } from '../comments/comments.component';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { MatSelect } from '@angular/material/select';
import { FormControl } from '@angular/forms';
import { HelperFunctionService } from 'src/app/shared/utils/helper/helper-function.service';
import { RolesService } from 'src/app/providers/roles/roles.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @ViewChild('customerSearchComp') customerSearchComp!: SearchComponent;
  @ViewChild('createdBySearchComp') createdBySearchComp!: SearchComponent;
  @ViewChild('assignedToSearchComp') assignedToSearchComp!: SearchComponent;
  taskTypeControl = new FormControl();
  userMenuPermissions: any;
  isDeleteEnabled = true;
  isWriteEnabled = true;
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
  cbSearch: any = '';
  atSearch = '';
  ttSearch: any = '';
  pageSize = this.service.calculatePaginationVal();
  sortType:any;
  soryByValue: any;
  roleName = localStorage.getItem('role_name')?.toLowerCase();

  @ViewChild('fromDateInput') fromDateInput!: ElementRef<HTMLInputElement>;
  taskType = [
    { id: 1, name: 'Lead' },
    { id: 2, name: 'Call Back' },
    { id: 3, name: 'Service' },
  ];
  constructor(
    private dialog: MatDialog,
    private taskService: TasksService,
    private service: CommonService,
    private _cdRef: ChangeDetectorRef,
    private _roleApiService: RolesService,
    private _helperFunctionService: HelperFunctionService
  ) {}
  @ViewChild('childRef') saledData!: SalesTableComponent;

  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;
  selectedIds: any = [];
  tab = 'status=unassigned';
  ngOnInit() {
    this.getDataBasedOnTabSelection(this.tab);
    this.triggerRoleAPI();
  }

  addTask() {
    this.dialog
      .open(AddTaskComponent, {
        width: '500px',
        height: 'max-content',
        disableClose: true,
        panelClass: 'task-dialog-container',
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.saveNewTask(res);
        }
      });
  }

  saveNewTask(payload: any) {
    this.taskService.postTask(payload).subscribe({
      next: (res) => {
        this.service.showSnackbar('Task Created Successfully');
        this.getDataBasedOnTabSelection(this.tab);
      },
      error: (err) => {
        this.service.showSnackbar(err.error.message);
      },
      complete: () => {},
    });
  }

  loadData(tab: any) {
    this.currentPage = 0;
    this.tableValues = [];
    switch (tab) {
      case 'unassigned':
        this.tab = 'status=' + tab;
        this.tableHeaders = data.tableHeaders;
        this.changeTab = tab;
        this.triggerRoleAPI();
        break;
      case 'assigned':
        this.tab = 'status=' + tab;
        this.tableHeaders = data.tableHeadersForAssigned;
        this.changeTab = '';
        this.triggerRoleAPI();
        break;
      case 'completed':
        this.tab = 'status=' + tab;
        this.tableHeaders = data.tableHeadersForCompleted;
        this.changeTab = tab;
        this.triggerRoleAPI();
        break;
      case 'verified':
        this.tab = 'status=' + tab;
        this.tableHeaders = data.tableHeadersForVerified;
        this.changeTab = '';
        this.triggerRoleAPI();
        break;
      case 'visit':
        this.tab = 'status=' + tab;
        this.tableHeaders = data.tableHeadersForVisit;
        this.changeTab = tab;
        this.triggerRoleAPI();
        break;
      default:
    }
    this.getDataBasedOnTabSelection(this.tab);
  }

  getDataBasedOnTabSelection(tab: any) {
    this.showOrHide = false;
    this.apiLoader = true;
    let query = `?pageSize=${this.pageSize}&page=${
      isNaN(this.currentPage) ? 1 : this.currentPage + 1
    }`;
    this.taskService
      .getTaskList(
        tab,
        query,
        this.searchQuery,
        this.cusSearch,
        this.cbSearch,
        this.atSearch,
        this.ttSearch,
        this.date
      )
      .subscribe({
        next: (res) => {
          !res.data.length && (this.showOrHide = true);
          this.apiLoader = false;

          this.tableValues = res.data.map((item: any) => ({
            ...item,
            assignToName: item.assignToName ? `${item.assignToName}` : '-'
        }));

          // this.tableValues = res.data;
          this.count = res.total;
        },
        error: (err) => {
          this.apiLoader = false;
        },
        complete: () => {},
      });
  }
  delete(data: any) {
    this.dialog
      .open(DeleteComponent, {
        width: '500px',
        height: 'max-content',
        disableClose: true,
        panelClass: 'delete-dialog-container',
        data: data,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.deleteUser(res);
        }
      });
  }
  deleteUser(id: any) {
    this.taskService.deleteTask(id).subscribe({
      next: (res) => {
        this.service.showSnackbar('Task Deleted Successfully');
        this.getDataBasedOnTabSelection(this.tab);
      },
      error: (err) => {
        this.service.showSnackbar(err.error.message);
      },
      complete: () => {},
    });
  }

  edit(data: any) {
    this.dialog
      .open(AddTaskComponent, {
        width: '500px',
        height: 'max-content',
        disableClose: true,
        panelClass: 'user-dialog-container',
        data: data,
      })
      .afterClosed()
      .subscribe((result: any[]) => {
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
        this.service.showSnackbar('Task Updated Successfully');
        this.getDataBasedOnTabSelection(this.tab);
      },
      error: (err) => {
        this.service.showSnackbar(err.error.message);
      },
      complete: () => {},
    });
  }
  selectAll(data: any) {
    data.forEach((item: any) => {
      const index = this.selectedIds.indexOf(item);
      index === -1
        ? this.selectedIds.push(item)
        : this.selectedIds.splice(index, 1);
    });
  }
  getIds(ids: any) {
    const index = this.selectedIds.indexOf(ids);
    index === -1
      ? this.selectedIds.push(ids)
      : this.selectedIds.splice(index, 1);

    if (this.selectedIds.length == this.saledData.tableValues.length) {
      this.saledData.isSelectAll = true;
    } else {
      this.saledData.isSelectAll = false;
    }
  }
  Verify() {
    this.taskService.verifyTask(this.selectedIds).subscribe({
      next: (res) => {
        this.service.showSnackbar('Verified Successfully');
        this.getDataBasedOnTabSelection(this.tab);
      },
      error: (err: any) => {
        this.service.showSnackbar(err.error.message);
      },
      complete: () => {},
    });
  }
  pagination(event: any): void {
    this.currentPage = event;
    this.getDataBasedOnTabSelection(this.tab);
  }
  searchBox(event: any) {
    this.searchQuery = `&customerName=${event}`;
    event && (this.currentPage = 0);
    this.currentPage = 0;
    this.getDataBasedOnTabSelection(this.tab);
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  onFromDateChange(event: any) {
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
    } else {
      return date;
    }
  }

  customerSearch(event: any) {
    this.cusSearch = `&customerName=${event}`;
    this.filterAll();
  }
  createdbySearch(event: any) {
    this.cbSearch = `&createdBy=${event}`;
    this.filterAll();
  }
  assignedToSearch(event: any) {
    this.atSearch = `&assignToName=${event}`;
    this.filterAll();
  }

  gettaskType(event: any) {
    this.ttSearch = `&taskType=${event.value}`;
    this.filterAll();
  }

  filterAll() {
    this.currentPage = 0;
    this.getDataBasedOnTabSelection(this.tab);
  }

  comments(data: any) {
    this.dialog
      .open(CommentsComponent, {
        width: '600px',
        height: 'max-content',
        disableClose: true,
        panelClass: 'delete-dialog-container',
        data: data,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.getDataBasedOnTabSelection(this.tab);
        }
      });
  }
  onRefreshClick() {
    this.customerNamePlaceholder = 'Customer Name...';
    this.cusSearch =
      this.cbSearch =
      this.atSearch =
      this.ttSearch =
      this.date =
        '';
    this.customerSearchComp.search.reset();
    this.createdBySearchComp.search.reset();
    this.assignedToSearchComp.search.reset();
    this.taskTypeControl.reset();
    this.getDataBasedOnTabSelection(this.tab);
  }

  triggerRoleAPI() {
    // Role API
    let roleId: any = localStorage.getItem('role_id');
    this._roleApiService.getRoleById(roleId).subscribe({
      next: (res) => {
        this.userMenuPermissions =
          this._helperFunctionService.getMenuPermissions(
            res.menuAccess,
            'task'
          );
        this.isDeleteEnabled = this.userMenuPermissions.permissions.delete;
        this.isWriteEnabled = this.userMenuPermissions.permissions.write;
        if (!this.isDeleteEnabled && !this.isWriteEnabled) {
          this.tableHeaders =
            this._helperFunctionService.removeTableHeaderByKey(
              this.tableHeaders,
              'action'
            );
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  sort(data: any) {
    // console.log('sorting-----', data);
    this.apiLoader = true;
    this.sortType = this.sortType == 'ASC' ? 'DESC' : 'ASC';
    this.sortType == 'ASC' && (this.soryByValue=`sortByAsc=${data.key}`);
    this.sortType == 'DESC' && (this.soryByValue=`sortByDes=${data.key}`);
    this.taskService.sortTask(this.soryByValue).subscribe({
      next: (res) => {
        this.apiLoader = false;
        this.count = res.totalCount;
        this.tableValues = res.data;
      },
      error: (err) => {
        this.apiLoader = false;
      },
    });
  }

}

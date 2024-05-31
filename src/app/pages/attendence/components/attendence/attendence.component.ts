import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import * as data from './attendence.data';
import { CommonService } from 'src/app/providers/core/common.service';
import { AttendanceService } from 'src/app/providers/attendance/attendance.service';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
import { RolesService } from 'src/app/providers/roles/roles.service';
import { HelperFunctionService } from 'src/app/shared/utils/helper/helper-function.service';

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MMM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

// export const MY_DATE_FORMATS = {
//   parse: {
//     dateInput: 'MM/DD/YYYY',
//   },
//   display: {
//     dateInput: 'MM/DD/YYYY',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };

@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.component.html',
  styleUrls: ['./attendence.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    // { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export class AttendenceComponent {
  pageCount: any;
  totalCount = 0;
  currentPage = 0;
  apiLoader = false;
  pageSize = this.service.calculatePaginationVal();
  searchQuery = '';
  showOrHide = false;

  startDate = new Date(); // Set initial view to current month and year

  constructor(
    private dialog: MatDialog,
    public router: Router,
    public service: CommonService,
    private attendance: AttendanceService,
    private _roleApiService: RolesService,
    private _helperFunctionService: HelperFunctionService
  ) {}
  @ViewChild('picker') datePickerElement = MatDatepicker;
  @ViewChild('fromDateInput') fromDateInput!: ElementRef<HTMLInputElement>;
  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;
  date: any = '';
  count = 0;
  userMenuPermissions: any;
  isDeleteEnabled = true;
  isWriteEnabled = true;

  openConsole(selectedRow: any) {
    let selectedId: NavigationExtras = {
      state: {
        data: selectedRow.id,
      },
    };
    this.router.navigate(['/attendence/attendence-console'], selectedId);
  }
  addAttendence() {}

  ngOnInit() {
    // this.getTodayAttendance();
    this.triggerRoleAPI();
    this.getTodayRecord();
  }
  
  getTodayRecord(){
    MY_FORMATS.display.dateInput = 'DD-MM-YYYY';
    this.date = this.service.dateFormat(this.startDate);
    this.getTodayAttendance();
  }
  getTodayAttendance() {
    this.showOrHide = false;
    this.apiLoader = true;

    let query = `pageSize=${this.pageSize}&page=${
      isNaN(this.currentPage) ? 1 : this.currentPage + 1
    }`;
    this.attendance
      .getTodayAttendance(this.date, query, this.searchQuery)
      .subscribe({
        next: (res) => {
          !res.data.length && (this.showOrHide = true);
          this.apiLoader = false;
          this.tableValues = res.data;
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
    this.attendance.deleteAttendance(id).subscribe({
      next: (res) => {
        this.service.showSnackbar('Attendance Deleted Successfully');
        this.getTodayAttendance();
      },
      error: (err) => {
        this.service.showSnackbar(err.error.message);
      },
      complete: () => {},
    });
  }

  edit(data: any) {}

  onFromDateChange(event: any) {
    MY_FORMATS.display.dateInput = 'DD-MM-YYYY';
    this.date = this.dateFormat(event.value);
    this.getTodayAttendance();
  }

  dateFormat(date: any) {
    if (moment.isMoment(date)) {
      const formattedDate = date.format('YYYY-MM-DD');
      return formattedDate;
    } else {
      return date;
    }
  }

  pagination(event: any): void {
    this.currentPage = event;
    this.getTodayAttendance();
  }

  searchBox(event: any) {
    this.searchQuery = `&userName=${event}`;
    event && (this.currentPage = 0);
    this.currentPage = 0;
    this.getTodayAttendance();
  }

  myDate = new FormControl();
  setMonthAndYear(
    normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    MY_FORMATS.display.dateInput = 'MMM YYYY';
    const month = normalizedMonthAndYear.month();
    const year = normalizedMonthAndYear.year();
    const newDate = moment({ year, month });
    this.myDate.setValue(newDate);
    datepicker.close();

    const reportDate = `${normalizedMonthAndYear.year()}-${
      normalizedMonthAndYear.month() + 1
    }`;
    this.attendance.attendanceReport(reportDate).subscribe({
      next: (res: any) => {
        !res.data.length && (this.showOrHide = true);
        this.tableHeaders = data.reportHeaders;
        this.tableValues = res.data;
        this.count = res.fetchedCount;
      },
      error: (err) => {
        this.service.showSnackbar(err.error.message);
      },
      complete: () => {},
    });
  }

  triggerRoleAPI() {
    // Role API
    let roleId: any = localStorage.getItem('role_id');
    this._roleApiService.getRoleById(roleId).subscribe({
      next: (res) => {
        this.userMenuPermissions =
          this._helperFunctionService.getMenuPermissions(
            res.menuAccess,
            'attendence'
          );
        this.isDeleteEnabled = this.userMenuPermissions.permissions.delete;
        this.isWriteEnabled = this.userMenuPermissions.permissions.write;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

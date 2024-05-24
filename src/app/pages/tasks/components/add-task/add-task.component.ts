import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/providers/admin/admin.service';
import { CompanyService } from 'src/app/providers/company/company.service';
import { CommonService } from 'src/app/providers/core/common.service';
import { CustomerService } from 'src/app/providers/customers/customer.service';
import { RolesService } from 'src/app/providers/roles/roles.service';
import { HelperFunctionService } from 'src/app/shared/utils/helper/helper-function.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  // Inside your component class
  selectedOption: string = 'task'; // Default option is 'task'
  searchQuery: any;
  userList: any;
  companyList: any;
  taskDetails: any;
  customerList: any;
  showStatus: boolean = false;
  filteredCustomer: any;
  userMenuPermissions: any;
  isWriteEnabled: any;
  @ViewChild('fromDateInput') fromDateInput!: ElementRef<HTMLInputElement>;
  date = '';
  constructor(
    private service: CommonService,
    private customerService: CustomerService,
    private userService: UsersService,
    private companyService: CompanyService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _roleApiService: RolesService,
    private _helperFunctionService: HelperFunctionService
  ) {}

  ngOnInit() {
    // this.selectedOptionChanges();
    this.taskDetails = this.fb.group({
      customerId: ['', !this.data ? Validators.required : null],
      taskType: ['', Validators.required],
      status: ['', Validators.required],
      assignTo: [''],
      description: [''],
      feedBack: [''],
      followUpDate: [''],
    });

    this.taskDetails.get('status').valueChanges.subscribe((status: any) => {
      if (status === 'Assigned') {
        this.taskDetails.get('assignTo').setValidators(Validators.required);
      } else {
        this.taskDetails.get('assignTo').clearValidators();
      }
      this.taskDetails.get('assignTo').updateValueAndValidity();
    });

    this.getUser();
    this.getCompany();
    this.getCustomers();
    if (this.data) {
      this.showStatus = this.data && true;
      this.taskDetails.get('customerId').disable();
      this.data.status === 'Assigned' &&
        this.taskDetails.get('taskType').disable();
      this.data.status === 'Assigned' &&
        this.taskDetails.get('assignTo').disable();
      this.taskDetails.patchValue(this.data);
    }
    this.triggerRoleAPI();
  }

  selectOption() {
    console.log(this.selectedOption);
    this.selectedOption === 'visit' &&
      this.taskDetails.get('taskType').setValidators(Validators.required);
    this.selectedOption === 'task' &&
      this.taskDetails.get('taskType').clearValidators();
  }

  getUser() {
    this.userService.getUsers('', '').subscribe({
      next: (res) => {
        this.userList = res.data;
      },
      error: (err) => {},
      complete: () => {},
    });
  }

  getCompany() {
    this.companyService.getCompanyList('', '').subscribe({
      next: (res) => {
        this.companyList = res.data;
      },
      error: (err) => {},
      complete: () => {},
    });
  }

  getCustomers() {
    this.searchQuery = '';
    this.customerService.getCustomers(this.searchQuery, '').subscribe({
      next: (res) => {
        // console.log('customers-----', res);
        this.customerList = res.data;
        console.log('customers-----', this.customerList);
      },
      error: (err) => {},
      complete: () => {},
    });
  }

  saveTask() {
    this.taskDetails.markAllAsTouched();
    if (this.taskDetails.invalid) {
      return;
    } else {
      if (this.data) {
        const taskDetails: any = this.taskDetails.getRawValue();
        taskDetails.status === 'Completed' && delete taskDetails.assignTo;
        this.dialogRef.close([taskDetails, this.data.id]);
      } else {
        const taskDetails: any = this.taskDetails.getRawValue();
        if (taskDetails.feedBack != '') {
          taskDetails.feedBack = [
            {
              feedback: taskDetails.feedBack,
              createdDate: new Date().toISOString(),
              createdBy: localStorage.getItem('userId'),
            },
          ];
        } else {
          delete taskDetails.feedBack;
        }
        if (this.selectedOption === 'visit') {
          delete taskDetails.assignTo;
          delete taskDetails.taskType;
        }

        taskDetails.status === 'Unassigned' && delete taskDetails.assignTo;
        this.dialogRef.close(taskDetails);
      }
    }
  }

  onFromDateChange(event: any) {
    this.date = this.service.dateFormat(event.value);
  }

  onInputChange(event: any) {
    const searchTerm = event.target.value;
    console.log('134----', searchTerm);
    this.searchQuery = `?name=${searchTerm}`;

    this.customerService.getCustomers(this.searchQuery, '').subscribe({
      next: (res) => {
        // console.log('customers-----', res);
        this.customerList = res.data;
        console.log('customers-----', this.customerList);
      },
      error: (err) => {},
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
            'task'
          );
        this.isWriteEnabled = this.userMenuPermissions.permissions.write;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

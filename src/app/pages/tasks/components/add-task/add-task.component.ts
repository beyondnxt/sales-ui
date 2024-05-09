import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddUserComponent } from 'src/app/pages/user/components/add-user/add-user.component';
import { UsersService } from 'src/app/providers/admin/admin.service';
import { CompanyService } from 'src/app/providers/company/company.service';
import { CommonService } from 'src/app/providers/core/common.service';
import { CustomerService } from 'src/app/providers/customers/customer.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  userList: any;
  companyList: any;
  taskDetails: any;
  customerList: any;
  showStatus: boolean = false;
  // taskDetails!: FormGroup;
  @ViewChild('fromDateInput') fromDateInput!: ElementRef<HTMLInputElement>;
  date = '';
  constructor(private service: CommonService, private customerService: CustomerService, private userService: UsersService, private companyService: CompanyService, private fb: FormBuilder, public dialogRef: MatDialogRef<AddTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.taskDetails = this.fb.group({
      customerId: [''],
      taskType: [''],
      status: [''],
      assignTo: [''],
      description: [''],
      feedBack: [''],
      followUpDate: [''],
    });
    this.getCustomer();
    this.getUser();
    this.getCompany();
    if (this.data) {
      this.showStatus = this.data && true;
      this.taskDetails.get('customerId').disable();
      this.data.status === 'Assigned' && this.taskDetails.get('taskType').disable();
      this.data.status === 'Assigned' && this.taskDetails.get('assignTo').disable();
      this.taskDetails.patchValue(this.data);
    }

  }

  getCustomer() {
    this.customerService.getCustomers().subscribe({
      next: (res) => {
        this.customerList = res.customers;
      }, error: (err) => {
      },
      complete: () => {
      }
    })
  }
  getUser() {
    this.userService.getUsers('', '').subscribe({
      next: (res) => {
        this.userList = res.data;
      }, error: (err) => {
      },
      complete: () => {
      }
    })
  }

  getCompany() {
    this.companyService.getCompanyList('', '').subscribe({
      next: (res) => {
        this.companyList = res.company;
      }, error: (err) => {
      },
      complete: () => {
      }
    })
  }

  saveTask() {
    this.taskDetails.markAllAsTouched();
    if (this.taskDetails.invalid) {
      return;
    } else {
      if (this.data) {
        const taskDetails: any = this.taskDetails.getRawValue();
        (taskDetails.status === 'Completed') && (delete taskDetails.assignTo);
        this.dialogRef.close([taskDetails, this.data.id]);
      }
      else {
        const taskDetails: any = this.taskDetails.getRawValue();
        if (taskDetails.feedBack != '') {
          taskDetails.feedBack = [{
            feedback: taskDetails.feedBack,
            createdDate: new Date().toISOString(),
            createdBy: localStorage.getItem('userId'),
          }];
        }
        else {
          delete taskDetails.feedBack;
        }

        (taskDetails.status === 'Unassigned') && (delete taskDetails.assignTo);
        this.dialogRef.close(taskDetails);
      }
    }

  }

  onFromDateChange(event: any) {
    this.date = this.service.dateFormat(event.value);
  }

}

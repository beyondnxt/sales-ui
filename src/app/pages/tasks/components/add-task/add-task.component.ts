import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddUserComponent } from 'src/app/pages/user/components/add-user/add-user.component';
import { UsersService } from 'src/app/providers/admin/admin.service';
import { CompanyService } from 'src/app/providers/company/company.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  userList: any;
  companyList: any;
  taskDetails: any;
  // taskDetails!: FormGroup;
  constructor(private userService: UsersService, private companyService: CompanyService, private fb: FormBuilder, public dialogRef: MatDialogRef<AddUserComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.taskDetails = this.fb.group({
      customerName: [''],
      taskType: [''],
      status: [''],
      assignTo: [''],
      description: [''],
      feedBack: [''],
    });
    this.getUser();
    this.getCompany();
    if (this.data) {
      console.log(this.data);
      this.taskDetails.get('customerName').disable();
      this.data.status === 'Assigned' && this.taskDetails.get('taskType').disable();
      this.data.status === 'Assigned' && this.taskDetails.get('assignTo').disable();
      this.taskDetails.patchValue(this.data);
    }

  }

  getUser() {
    this.userService.getUsers('').subscribe({
      next: (res) => {
        this.userList = res.data;
      }, error: (err) => {
      },
      complete: () => {
      }
    })
  }

  getCompany() {
    this.companyService.getCompanyList().subscribe({
      next: (res) => {
        this.companyList = res.company;
      }, error: (err) => {
      },
      complete: () => {
      }
    })
  }

  saveTask() {
    if (this.data) {
      const taskDetails: any = this.taskDetails.getRawValue();
      (taskDetails.status === 'Completed') && (delete taskDetails.assignTo);
      this.dialogRef.close([taskDetails, this.data.id]);
    }
    else {
      const taskDetails: any = this.taskDetails.getRawValue();
      (taskDetails.status === 'Unassigned') && (delete taskDetails.assignTo);
      // console.log(taskDetails);
      this.dialogRef.close(taskDetails);
    }
  }

}

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddUserComponent>) { }
  addUserDetails = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/)]],
    lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+(\s[a-zA-Z0-9]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    status: [false],
    roleId: ['', [Validators.required]],
  });
  saveUser(){
    if(this.addUserDetails.invalid){
      return;
    }else{
      const userDetails = this.addUserDetails.getRawValue();
      this.dialogRef.close(userDetails)
    }
  }
}

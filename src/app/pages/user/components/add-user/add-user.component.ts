import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddUserComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  addUserDetails = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/)]],
    lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+(\s[a-zA-Z0-9]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', this.isPasswordRequired() ? Validators.required : null],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    status: [false],
    roleId: ['', [Validators.required]],
  });

  isPasswordRequired() {
    if (this.data) { return false; } else { return true; }
  }

  ngOnInit() {
    if (this.data) {
      this.addUserDetails.patchValue(this.data)
    }
  }

  saveUser() {
    this.addUserDetails.markAllAsTouched();
    if (this.addUserDetails.invalid) {
      return;
    } else {

      const userDetails: any = this.addUserDetails.getRawValue();

      if (this.data) {
        if ('password' in userDetails) {
          delete userDetails.password;
        }
        this.dialogRef.close([userDetails, this.data.id]);
      }else{
        this.dialogRef.close(userDetails);
      }
    }
  }
}

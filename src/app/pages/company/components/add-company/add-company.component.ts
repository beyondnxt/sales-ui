import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddUserComponent } from 'src/app/pages/user/components/add-user/add-user.component';
import { CompanyHelper } from '../company/company.helper';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent {
  companyDetails = this.fb.group({
    companyName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/)]],
    email: [''],
    phoneNo: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    latitude: [''],
    longitude: [''],
    // address: [''],
    street: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s\-/.,']+$/)]],
    city: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s\-/'.]+$/)]],
    zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    country: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s\-]+$/)]],
  });
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddUserComponent>, private companyHelper: CompanyHelper, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(){
    if (this.data) {
      this.companyDetails.patchValue(this.data)
    }
  }

  saveUser(){
    this.companyDetails.markAllAsTouched();
    if (this.companyDetails.invalid) {
      return;
    } else {

      const companyata = this.companyHelper.mapBoxData(this.companyDetails.getRawValue());

      if (this.data) {
        this.dialogRef.close([companyata, this.data.id]);
      } else {
        const companyata = this.companyHelper.mapBoxData(this.companyDetails.getRawValue());
        this.dialogRef.close(companyata);
      }
    }
  }
}

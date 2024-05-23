import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent {


  customerDetails = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/)]],
    contactPerson: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/)]],
    email: [''],
    contactNo: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    latitude: [''],
    longitude: [''],
    address: [''],
    area: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s\-/.,']+$/)]],
    city: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s\-/'.]+$/)]],
    state: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s\-/'.]+$/)]],
    pinCode: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    country: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s\-]+$/)]],
    gstNumber:[''],
  });
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddCustomerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if (this.data) {
      this.customerDetails.patchValue(this.data)
    }
  }

  saveCustomer() {
    this.customerDetails.markAllAsTouched();
    if (this.customerDetails.invalid) {
      return;
    } else {

      if (this.data) {
        this.dialogRef.close([this.customerDetails.getRawValue(), this.data.id]);
      } else {
        this.dialogRef.close(this.customerDetails.getRawValue());
      }
    }
  }

}

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
    name: ['', Validators.required],
    contactPerson: [''],
    email: [''],
    contactNo: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    latitude: [''],
    longitude: [''],
    address: [''],
    area: [''],
    city: [''],
    state: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s\-/'.]+$/)]],
    pinCode: [''],
    country: [''],
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
      console.log('data-----', this.customerDetails.getRawValue());
      if (this.data) {
        this.dialogRef.close([this.customerDetails.getRawValue(), this.data.id]);
      } else {
        this.dialogRef.close(this.customerDetails.getRawValue());
      }
    }
  }

}

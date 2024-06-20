import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddUserComponent } from 'src/app/pages/user/components/add-user/add-user.component';
import { CompanyHelper } from '../company/company.helper';
import { HelperFunctionService } from 'src/app/shared/utils/helper/helper-function.service';
import { RolesService } from 'src/app/providers/roles/roles.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss'],
})
export class AddCompanyComponent {
  userMenuPermissions: any;
  isWriteEnabled: any;
  companyDetails = this.fb.group({
    companyName: [
      '',
      [Validators.required, Validators.pattern(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/)],
    ],
    latitude: ['', Validators.required],
    longitude: ['', Validators.required],
    openingTime: ['09:00:00', Validators.required],
    closingTime: ['20:00:00', Validators.required],
    // email: [''],
    // phoneNo: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    // address: [''],
    // street: [
    //   '',
    //   [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s\-/.,']+$/)],
    // ],
    // city: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s\-/'.]+$/)]],
    // zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    // country: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s\-]+$/)]],
  });
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddUserComponent>,
    private companyHelper: CompanyHelper,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _roleApiService: RolesService,
    private _helperFunctionService: HelperFunctionService
  ) {}

  ngOnInit() {
    if (this.data) {
      this.companyDetails.patchValue(this.data);
    }

    this.triggerRoleAPI();
  }

  saveUser() {
    this.companyDetails.markAllAsTouched();
    if (this.companyDetails.invalid) {
      return;
    } else {
      const companyata = this.companyDetails.getRawValue();

      if (this.data) {
        this.dialogRef.close([companyata, this.data.id]);
      } else {
        this.dialogRef.close(companyata);
      }
    }
  }

  triggerRoleAPI() {
    // Role API
    let roleId: any = localStorage.getItem('role_id');
    this._roleApiService.getRoleById(roleId).subscribe({
      next: (res) => {
        this.userMenuPermissions =
          this._helperFunctionService.getMenuPermissions(
            res.menuAccess,
            'company'
          );
        this.isWriteEnabled = this.userMenuPermissions.permissions.write;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

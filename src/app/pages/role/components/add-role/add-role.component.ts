import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddUserComponent } from 'src/app/pages/user/components/add-user/add-user.component';
import { RolesService } from 'src/app/providers/roles/roles.service';
import { HelperFunctionService } from 'src/app/shared/utils/helper/helper-function.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss'],
})
export class AddRoleComponent {
  menuAccessData = [];
  isMenuAccessValid: boolean = true;

  userMenuPermissions: any;
  isDeleteEnabled = true;
  isWriteEnabled = true;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<AddUserComponent>,
    private _roleApiService: RolesService,
    private _helperFunctionService: HelperFunctionService
  ) {}

  permissions = [
    { name: 'Dashboard' },
    { name: 'Users' },
    { name: 'Roles' },
    { name: 'Product' },
    { name: 'Attendence' },
    { name: 'Task' },
    { name: 'Company' },
    { name: 'Approve' },
    { name: 'Customer' },
  ];

  roleData = this.fb.group({
    name: ['', [Validators.required]],
    description: [''],
    menuAccess: this.fb.array(
      this.permissions.map((permission) =>
        this.fb.group({
          name: [permission.name],
          status: [false],
          // read: [false],
          write: [false],
          delete: [false],
        })
      )
    ),
  });

  ngOnInit() {
    if (this.dialogData) {
      let data = {
        name: this.dialogData.name,
        description: this.dialogData.description,
        menuAccess: [{}],
      };

      const menuAccessArray: any = [];
      this.dialogData.menuAccess.forEach((permission: any) => {
        const permissionName = Object.keys(permission)[0];
        const permissions = permission;
        const isActiveStatus = permissions[permissionName];

        menuAccessArray.push({
          [permissionName]: true,
          status: isActiveStatus,
          // read: permissions.permissions.read,
          write: permissions.permissions.write,
          delete: permissions.permissions.delete,
        });
      });

      data.menuAccess = menuAccessArray;
      this.roleData.patchValue(data);
    }
    this.triggerRoleAPI();
  }

  submit() {
    this.roleData.markAllAsTouched();
    if (this.roleData.invalid) {
      return;
    } else {
      const formData = this.roleData.value;
      const transformedData = this.transformMenuAccess(formData);
      if (this.dialogData)
        this.dialogRef.close([transformedData, this.dialogData.id]);
      else this.dialogRef.close(transformedData);
    }
  }

  transformMenuAccess(formData: any): any {
    const transformedMenuAccess = formData.menuAccess.map((item: any) => {
      const menuName = item.name.toLowerCase();

      const transformedItem = {
        menu_visibility: item.status,
        menuName: menuName,
        permissions: {
          // read: item.read,
          write: item.write,
          delete: item.delete,
        },
      };
      return transformedItem;
    });

    return {
      name: formData.name,
      description: formData.description,
      menuAccess: transformedMenuAccess,
    };
  }

  triggerRoleAPI() {
    // Role API
    let roleId: any = localStorage.getItem('role_id');
    this._roleApiService.getRoleById(roleId).subscribe({
      next: (res) => {
        this.userMenuPermissions =
          this._helperFunctionService.getMenuPermissions(
            res.menuAccess,
            'roles'
          );
        this.isWriteEnabled = this.userMenuPermissions.permissions.write;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

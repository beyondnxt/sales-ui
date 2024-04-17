import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddUserComponent } from 'src/app/pages/user/components/add-user/add-user.component';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent {

  menuAccessData = [];
  isMenuAccessValid: boolean = true;
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public dialogData: any, public dialogRef: MatDialogRef<AddUserComponent>) { }

  permissions = [
    { name: 'Dashboard' },
    { name: 'Users' },
    { name: 'Roles' },
    { name: 'Product' },
    { name: 'Lead' },
    { name: 'Attendance' },
    { name: 'Task' },
    { name: 'Feedback' }
  ];


  roleData = this.fb.group({
    name: ['', [Validators.required]],
    description: [''],
    menuAccess: this.fb.array(
      this.permissions.map(permission => this.fb.group({
        name: [permission.name],
        read: [false],
        write: [false],
        delete: [false]
      }))
    )
  });

  ngOnInit() {

    if (this.dialogData) {
      console.log('qq----', this.dialogData);
      let data = {
        "name": this.dialogData.name,
        "description": this.dialogData.description,
        "menuAccess" : [{
        }]
      };


      const menuAccessArray: any = [];
      this.dialogData.menuAccess.forEach((permission: any) => {
        const permissionName = Object.keys(permission)[0];

        const permissions = permission;
        console.log('59------', permissions);
        menuAccessArray.push({
            [permissionName]: true,
            read: permissions.permissions.read,
            write: permissions.permissions.write,
            delete: permissions.permissions.delete,
        });
    });

    data.menuAccess = menuAccessArray;
    this.roleData.patchValue(data);
    }
  }

  submit() {
    console.log("hiiii");
    this.roleData.markAllAsTouched();
    if (this.roleData.invalid) {
      return;
    } else {
      const formData = this.roleData.value;
      const transformedData = this.transformMenuAccess(formData);
      this.dialogRef.close(transformedData);
    }
  }

  transformMenuAccess(formData: any): any {
    const transformedMenuAccess = formData.menuAccess.map((item: any) => {
      const menuName = item.name.toLowerCase();

      const transformedItem = {
        [menuName]: true,
        permissions: {
          read: item.read,
          write: item.write,
          delete: item.delete
        }
      };
      return transformedItem;
    });

    return {
      name: formData.name,
      description: formData.description,
      menuAccess: transformedMenuAccess
    };
  }

}

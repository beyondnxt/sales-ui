import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RolesService } from 'src/app/providers/roles/roles.service';
import { HelperFunctionService } from '../../utils/helper/helper-function.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent {
  userMenuPermissions: any;
  isWriteEnabled = true;
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _roleApiService: RolesService,
    private _helperFunctionService: HelperFunctionService
  ) {}

  delete() {
    this.dialogRef.close(this.data);
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

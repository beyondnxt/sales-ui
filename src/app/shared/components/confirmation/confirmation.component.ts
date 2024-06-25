import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RolesService } from 'src/app/providers/roles/roles.service';
import { HelperFunctionService } from '../../utils/helper/helper-function.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {
  userMenuPermissions: any;
  isWriteEnabled = true;
  constructor(private dialog: MatDialog, public dialogRef: MatDialogRef<ConfirmationComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private _roleApiService: RolesService,
  private _helperFunctionService: HelperFunctionService){}

  ngOnInit(){
    // console.log('aaaa-----', this.data);
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
  confirm(): void {
    this.dialogRef.close(true);
  }
  onCancel(): void {
    this.dialogRef.close(false);
  }

}

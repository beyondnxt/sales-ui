import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {
  constructor(private dialog: MatDialog, public dialogRef: MatDialogRef<ConfirmationComponent>,@Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit(){
    console.log('aaaa-----', this.data);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
  onCancel(): void {
    this.dialogRef.close(false);
  }

}

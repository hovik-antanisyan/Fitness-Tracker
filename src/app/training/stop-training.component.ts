import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-stop-training',
  template: `<h1 mat-dialog-title>Are you sure?</h1>
  <mat-dialog-content>
      <p>You already reach to {{data.progress}}%</p>
  </mat-dialog-content>
  <mat-dialog-actions>
      <button mat-raised-button [mat-dialog-close]="true">Yes</button>
      <button mat-raised-button [mat-dialog-close]="false">No</button>
  </mat-dialog-actions>`
})
export class StopTrainingComponent {
  constructor(
    public dialogRef: MatDialogRef<StopTrainingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { progress: string }) {
  }
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PeriodicElement } from '../../models/periodic-element.model';

@Component({
  standalone:false,
  selector: 'edit-dialog',
  templateUrl: './edit-dialog.html',
})
export class EditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement
  ) {}
}
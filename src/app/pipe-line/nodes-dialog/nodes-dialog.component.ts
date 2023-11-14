import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface DialogData {
  items: { name: string; color: string; label: string }[];
}

@Component({
  selector: 'app-nodes-dialog',
  standalone: true,
  imports: [CommonModule, MatListModule, MatDialogModule, MatIconModule, MatButtonModule],
  templateUrl: './nodes-dialog.component.html',
  styleUrl: './nodes-dialog.component.css',
})
export class NodesDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<NodesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  // Function to handle item selection
  selectItem(item: { name: string; color: string; label: string }) {
    this.dialogRef.close(item);
  }
  // Function to handle CloseButton
  closeDialog(){
    this.dialogRef.close()
  }
}

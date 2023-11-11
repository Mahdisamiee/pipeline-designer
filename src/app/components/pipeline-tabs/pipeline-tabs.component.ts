import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

// MY Components
import { DialogComponent } from './dialog/dialog.component';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-pipeline-tabs',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    TableComponent
  ],
  templateUrl: './pipeline-tabs.component.html',
  styleUrl: './pipeline-tabs.component.css',
})
export class PipelineTabsComponent implements OnInit {
  myForm: FormGroup;

  constructor(private dialog: MatDialog, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.myForm = this.formBuilder.group({
      description: [''],
      step: [{ value: 'Design', disabled: true }],
      updated: [{ value: 'About 22 hours', disabled: true }],
      sideToggle: [false],
    });
  }

  /**
   * ** Info Tab
   * Handles form submission.
   */
  onSubmit(): void {
    console.log(this.myForm.value);
  }

  /**
   * ** Info Tab
   * Resets the form to its initial state.
   */
  onReset(): void {
    this.myForm.reset();
  }

  /**
   * ** Variables Tab
   * Opens a dialog and logs the result after it is closed.
   * it should have a submit functionality to send data to backend and
   * also show the saved data.
   * for now we leave it to just show the result in console
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog result:', result);
    });
  }
}

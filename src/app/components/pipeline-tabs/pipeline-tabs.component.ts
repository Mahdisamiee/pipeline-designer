import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

// MY Components
import { DialogComponent } from './dialog/dialog.component';
import { TableComponent } from './table/table.component';

// interfaces
interface StringsFilter {
  value: string;
  viewValue: string;
}
interface Fields {
  value: string;
  viewValue: string;
}

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
    MatSelectModule,
    TableComponent,
  ],
  templateUrl: './pipeline-tabs.component.html',
  styleUrl: './pipeline-tabs.component.css',
})
export class PipelineTabsComponent implements OnInit {
  myForm: FormGroup;

  @Input() pipelineData: { type: string; info: string };

  filters: StringsFilter[] = [
    { value: 'ext-1', viewValue: 'Add Extra Character' },
    { value: 'up-1', viewValue: 'Change to UpperCase' },
    { value: 'law-2', viewValue: 'Change to LowerCase' },
    { value: 'clcLeng-2', viewValue: 'calculate Length' },
    { value: 'title-2', viewValue: 'Change to TitleCase' },
    { value: 'ctText-2', viewValue: 'Contains Text' },
    { value: 'matText-2', viewValue: 'Match Similar Text' },
    { value: 'sechRe-2', viewValue: 'Search and Replace' },
    { value: 'remov-2', viewValue: 'Remove Part of Text' },
    { value: 'maPat-2', viewValue: 'Match Pattern' },
  ];
  fields: Fields[] = [
    { value: 'ext-1', viewValue: 'String 1' },
    { value: 'up-1', viewValue: 'string 2 data' },
  ];
  positions: Fields[] = [
    { value: 'left', viewValue: 'Left' },
    { value: 'right', viewValue: 'Right' },
  ];

  constructor(private dialog: MatDialog, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.myForm = this.formBuilder.group({
      filterName: [{ value: '' }],
      processFields: [{ value: '', disabled: false }],
      sideToggle: [false],
      size: [{ value: 5, disabled: false }],
      addedChar: [{ value: '0', disabled: false }],
      position: [{ value: 'left', disabled: false }],
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

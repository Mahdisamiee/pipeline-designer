import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

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
    MatSlideToggleModule
  ],
  templateUrl: './pipeline-tabs.component.html',
  styleUrl: './pipeline-tabs.component.css',
})
export class PipelineTabsComponent implements OnInit {
  myForm: FormGroup;

  ngOnInit() {
    this.myForm = new FormGroup({
      description: new FormControl(''),
      step: new FormControl({ value: 'Design', disabled: true }),
      updated: new FormControl({ value: 'About 22 hours', disabled: true }),
      sideToggle: new FormControl(false),
    });
  }

  onSubmit() {
    console.log(this.myForm.value);
    // Add your submit logic here
  }

  onReset() {
    this.myForm.reset();
  }
}

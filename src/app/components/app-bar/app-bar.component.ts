import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-app-bar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.css',
})
export class AppBarComponent {
  title: string = 'PipeLine';
  runStatus: boolean = true;

  toggleRunStatus() {
    this.runStatus = !this.runStatus;
  }
}

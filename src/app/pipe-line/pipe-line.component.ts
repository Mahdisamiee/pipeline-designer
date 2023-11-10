import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pipe-line',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatButtonModule],
  templateUrl: './pipe-line.component.html',
  styleUrls: ['./pipe-line.component.css'],
})
export class PipeLineComponent {
  showFiller = true;
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { BottomSheetComponent } from '../components/bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-pipe-line',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    BottomSheetComponent,
  ],
  templateUrl: './pipe-line.component.html',
  styleUrls: ['./pipe-line.component.css'],
})
export class PipeLineComponent {
  showFiller = true;
}

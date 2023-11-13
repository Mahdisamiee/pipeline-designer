import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  MatBottomSheet,
  MatBottomSheetRef,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-app-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBottomSheetModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.css',
})
export class AppBarComponent {
  constructor(private bottomSheet: MatBottomSheet) {}
  title: string = 'PipeLine';
  private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent> | null = null;
  // Status
  runStatus: boolean = true;
  // side nav
  @Output() toggleSideNavEvent = new EventEmitter<void>();
  // Bottom Sheet


  // **********************************
  // Status
  toggleRunStatus() {
    this.runStatus = !this.runStatus;
  }
  // SideNav
  toggleSideNav() {
    this.toggleSideNavEvent.emit();
  }

  // Bottom Sheet
  toggleBottomSheet(): void {
    if (this.bottomSheetRef) {
      this.bottomSheetRef.dismiss();
      this.bottomSheetRef = null;
    } else {
      this.bottomSheetRef = this.bottomSheet.open(BottomSheetComponent);
    }
  }
}

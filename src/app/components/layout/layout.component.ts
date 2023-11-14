import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Module Imports
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { AppBarComponent } from '../app-bar/app-bar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

/** @title Respond to viewport changes with BreakpointObserver */
@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    NavBarComponent,
    AppBarComponent,
  ],
  templateUrl: 'layout.component.html',
  styleUrls: ['layout.component.css'],
  standalone: true,
})
export class LayoutComponent implements OnDestroy {
  destroyed = new Subject<void>();
  currentScreenSize: string;

  

  // Map to display breakpoint names
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize =
              this.displayNameMap.get(query) ?? 'Unknown';
          }
        }
      });
  }
    

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Module Imports
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { AppBarComponent } from '../app-bar/app-bar.component';
import { DetailSideNavComponent } from '../detail-side-nav/detail-side-nav.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

/** @title Respond to viewport changes with BreakpointObserver */
@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    NavBarComponent,
    AppBarComponent,
    DetailSideNavComponent,
  ],
  templateUrl: 'layout.component.html',
  styleUrls: ['layout.component.css'],
  standalone: true,
})
export class LayoutComponent implements OnDestroy {
  destroyed = new Subject<void>();
  currentScreenSize: string;

  @ViewChild('sideNav') sideNav: DetailSideNavComponent;

  toggleSideNav() {
    this.sideNav.drawer.toggle();
    console.log(this.sideNav.drawer);
  }

  // Create a map to display breakpoint names for demonstration purposes.
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

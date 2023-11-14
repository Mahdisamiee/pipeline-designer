import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule, MatDrawer } from '@angular/material/sidenav';

// Components
import { PipelineTabsComponent } from '../pipeline-tabs/pipeline-tabs.component';

@Component({
  selector: 'app-detail-side-nav',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    PipelineTabsComponent,
  ],
  templateUrl: './detail-side-nav.component.html',
  styleUrl: './detail-side-nav.component.css',
})
export class DetailSideNavComponent {
  showFiller = false;
  sideNavName: string = 'Pipeline Details';
  currentRoute: string;
  @ViewChild('drawer') drawer: MatDrawer;
  @Input() pipelineData: { type: 'process-node' | 'source-node' | 'destination-node'; info: string };

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  toggle() {
    this.drawer.toggle();
  }
}

import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

import { MatDialog } from '@angular/material/dialog';

// components
import { DetailSideNavComponent } from '../components/detail-side-nav/detail-side-nav.component';
import { AppBarComponent } from '../components/app-bar/app-bar.component';
import { GraphService } from './services/graph.service';

@Component({
  selector: 'app-pipe-line',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    DetailSideNavComponent,
    AppBarComponent,
  ],
  templateUrl: './pipe-line.component.html',
  styleUrls: ['./pipe-line.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PipeLineComponent implements OnInit, AfterViewInit {
  constructor(private graphService: GraphService) {}
  nodeData: {
    type: 'process-node' | 'source-node' | 'destination-node';
    info: string;
  }

  // Side Nav functionality
  @ViewChild('sideNav') sideNav: DetailSideNavComponent;

  toggleSideNav() {
    this.sideNav.drawer.toggle();
    console.log(this.sideNav.drawer);
  }

  ngOnInit(): void {
    this.graphService.nodeData$.subscribe(data => {
      this.nodeData = data;
    });
  }

  // ******************************Graph Functionality*************************

  /** #### Call the process of create graph and to DOM */
  ngAfterViewInit(): void {
    // this.initializeGraph();
    this.graphService.initializeGraph();
    // this.createStencil();
  }

  // graph Zooming functionality

  zoomIn(): void {
    this.graphService.zoomIn();
  }

  zoomOut(): void {
    this.graphService.zoomOut();
  }

}

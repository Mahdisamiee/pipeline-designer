import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PipeLineComponent } from './pipe-line.component';
import { DetailSideNavComponent } from '../components/detail-side-nav/detail-side-nav.component';
import { AppBarComponent } from '../components/app-bar/app-bar.component';
import { GraphService } from './services/graph.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// Mock implementation of GraphService
const mockGraphService = {
    nodeData$: of({type: "process-node", info:"strings"}),
    initializeGraph: jasmine.createSpy('initializeGraph'),
    zoomIn: jasmine.createSpy('zoomIn'),
    zoomOut: jasmine.createSpy('zoomOut'),
    // Add other methods or properties as needed
  };

const mockActivatedRoute = {
    // Add properties and methods as needed by your component
    // For example, if your component subscribes to params or queryParams:
    params: of({}),
    queryParams: of({}),
    // ... other properties and methods ...
  };

describe('PipeLineComponent', () => {
  let component: PipeLineComponent;
  let fixture: ComponentFixture<PipeLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [PipeLineComponent,NoopAnimationsModule,],
        providers: [
          { provide: GraphService, useValue: mockGraphService },
          { provide: ActivatedRoute, useValue: mockActivatedRoute } // Provide the mock here
        ]
      }).compileComponents();

    fixture = TestBed.createComponent(PipeLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle side navigation', () => {
    // Assuming sideNav is a mock or a real component with a mock drawer
    spyOn(component.sideNav.drawer, 'toggle');
    component.toggleSideNav();
    expect(component.sideNav.drawer.toggle).toHaveBeenCalled();
  });

  it('should call zoom in on graph service', () => {
    component.zoomIn();
    expect(mockGraphService.zoomIn).toHaveBeenCalled();
  });

  it('should call zoom out on graph service', () => {
    component.zoomOut();
    expect(mockGraphService.zoomOut).toHaveBeenCalled();
  });

  it('should initialize graph on view init', () => {
    expect(mockGraphService.initializeGraph).toHaveBeenCalled();
  });

  // Additional tests can be added here
});

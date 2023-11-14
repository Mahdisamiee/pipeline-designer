import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { LayoutComponent } from './layout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let breakpointObserver: BreakpointObserver;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LayoutModule,
        RouterTestingModule,
        NoopAnimationsModule,
        LayoutComponent // Import the standalone component
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    breakpointObserver = TestBed.inject(BreakpointObserver);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should clean up on destroy', () => {
    const nextSpy = spyOn(component.destroyed, 'next');
    const completeSpy = spyOn(component.destroyed, 'complete');

    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  // Additional tests can be added here for other functionalities
});

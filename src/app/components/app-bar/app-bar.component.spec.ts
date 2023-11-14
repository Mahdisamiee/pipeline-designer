import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppBarComponent } from './app-bar.component';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { of } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AppBarComponent', () => {
  let component: AppBarComponent;
  let fixture: ComponentFixture<AppBarComponent>;
  let mockBottomSheet: jasmine.SpyObj<MatBottomSheet>;

  
  beforeEach(async () => {
    mockBottomSheet = jasmine.createSpyObj('MatBottomSheet', [
      'open',
      'dismiss',
    ]);

    const mockActivatedRoute = {
      snapshot: { paramMap: { get: () => 'some_id' } },
      params: of({ id: 'some_id' }),
    };

    await TestBed.configureTestingModule({
      imports: [
        AppBarComponent,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatBottomSheetModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MatBottomSheet, useValue: mockBottomSheet },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle run status', () => {
    expect(component.runStatus).toBeTrue();
    component.toggleRunStatus();
    expect(component.runStatus).toBeFalse();
  });

  it('should emit event on side navigation toggle', () => {
    spyOn(component.toggleSideNavEvent, 'emit');
    component.toggleSideNav();
    expect(component.toggleSideNavEvent.emit).toHaveBeenCalled();
  });

  // it('should open and close the bottom sheet', fakeAsync(() => {
  //   // Simulate opening the bottom sheet
  //   component.toggleBottomSheet();
  //   tick();
  //   expect(mockBottomSheet.open).toHaveBeenCalledWith(jasmine.any(Function));
  
  //   // Simulate closing the bottom sheet
  //   component.toggleBottomSheet();
  //   tick();
  //   expect(mockBottomSheet.dismiss).toHaveBeenCalled();
  // }));

  afterEach(() => {
    // Reset the calls on the spies
    mockBottomSheet.open.calls.reset();
    mockBottomSheet.dismiss.calls.reset();
  });

});

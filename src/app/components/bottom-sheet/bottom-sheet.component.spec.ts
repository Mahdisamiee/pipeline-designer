import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BottomSheetComponent } from './bottom-sheet.component';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { By } from '@angular/platform-browser';

describe('BottomSheetComponent', () => {
  let component: BottomSheetComponent;
  let fixture: ComponentFixture<BottomSheetComponent>;
  let bottomSheetRefStub: Partial<MatBottomSheetRef>;

  beforeEach(waitForAsync(() => {
    // Create a stub for the MatBottomSheetRef dependency
    bottomSheetRefStub = {
      dismiss: jasmine.createSpy('dismiss'),
    };

    TestBed.configureTestingModule({
      imports: [BottomSheetComponent],
      providers: [{ provide: MatBottomSheetRef, useValue: bottomSheetRefStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(BottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  //
  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('contains anchorElements Elements', () => {
    const anchorElements = fixture.debugElement.queryAll(
      By.css('mat-nav-list a')
    );
    expect(anchorElements.length).toBe(4); // Assuming there are 4 anchor tags
    expect(anchorElements[0].nativeElement.textContent).toContain('Varzesh3');
    expect(anchorElements[1].nativeElement.textContent).toContain(
      'Google Docs'
    );
    expect(anchorElements[2].nativeElement.textContent).toContain(
      'Google Sheets'
    );
    expect(anchorElements[3].nativeElement.textContent).toContain('Kit365');
  });

  it('should prevent default action on click of anchor tag', () => {
    const event = new MouseEvent('click');
    spyOn(event, 'preventDefault');
    component.openLink(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should dismiss the bottom sheet on link click', () => {
    // Create a spy on the bottomSheetRef.dismiss method
    const bottomSheetRefSpy = spyOn(component['bottomSheetRef'], 'dismiss');

    // Find one of the anchor tags in the template
    const anchorElement = fixture.debugElement.query(
      By.css('mat-nav-list a')
    ).nativeElement;

    // Simulate a click event on the anchor tag
    anchorElement.click();

    // Ensure that the dismiss method was called
    expect(bottomSheetRefSpy).toHaveBeenCalled();
  });


});

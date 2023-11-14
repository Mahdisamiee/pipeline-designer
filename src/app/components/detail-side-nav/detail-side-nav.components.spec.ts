// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { DetailSideNavComponent } from './detail-side-nav.component';
// import { By } from '@angular/platform-browser';

// describe('DetailSideNavComponent', () => {
//   let component: DetailSideNavComponent;
//   let fixture: ComponentFixture<DetailSideNavComponent>;

//   beforeEach(waitForAsync(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         RouterTestingModule,
//         NoopAnimationsModule,
//         MatSidenavModule,
//         DetailSideNavComponent // Import the standalone component here
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(DetailSideNavComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   }));

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should toggle drawer', () => {
//     spyOn(component.drawer, 'toggle');
//     component.toggle();
//     expect(component.drawer.toggle).toHaveBeenCalled();
//   });

//   // it('should display pipeline data info or side nav name', () => {
//   //   component.pipelineData = { type: 'process-node', info: 'Test Info' };
//   //   fixture.detectChanges();
//   //   let content = fixture.debugElement.query(By.css('h2')).nativeElement.textContent;
//   //   expect(content).toContain('Test Info');

//   //   // Resetting pipelineData to simulate the else condition
//   //   component.pipelineData = undefined;
//   //   fixture.detectChanges();
//   //   content = fixture.debugElement.query(By.css('h2')).nativeElement.textContent;
//   //   expect(content).toContain(component.sideNavName);
//   // });

//   // it('should update currentRoute on navigation end', () => {
//   //   // Simulate a navigation end event
//   //   const router = TestBed.inject(Router);
//   //   router.navigate(['someRoute']);
//   //   fixture.detectChanges();
//   //   expect(component.currentRoute).toBe('/someRoute');
//   // });
// });

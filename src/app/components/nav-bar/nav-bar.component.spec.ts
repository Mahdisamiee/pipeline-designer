import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavBarComponent } from './nav-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        RouterTestingModule,
        NavBarComponent // Import the standalone component
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display menu button and open menu on click', () => {
    const menuButton = fixture.debugElement.query(By.css('.navbar-menu-button'));
    expect(menuButton).toBeTruthy();

    // Simulate click and expect the menu to be displayed
    // Note: Actual display of menu might require additional setup or mocking
    menuButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Expectations for menu display can be added here
  });

  it('should have navigation links', () => {
      fixture.detectChanges()
      console.log(fixture.debugElement.nativeElement.innerHTML);
    const navLinks = fixture.debugElement.queryAll(By.css('.router-link'));
    expect(navLinks.length).toBeGreaterThan(0);
    // Expect at least one nav link
    // Further assertions can be made about the hrefs or text content of the links
  });

  it('should have icon buttons', () => {
    const iconButtons = fixture.debugElement.queryAll(By.css('button[mat-icon-button]'));
    expect(iconButtons.length).toBe(3); // Assuming there are 3 icon buttons
    // Further assertions can be made about the icons or tooltips
  });

  // Additional tests can be added here for other functionalities
});

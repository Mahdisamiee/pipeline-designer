import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodesDialogComponent } from './nodes-dialog.component';

describe('NodesDialogComponent', () => {
  let component: NodesDialogComponent;
  let fixture: ComponentFixture<NodesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NodesDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NodesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

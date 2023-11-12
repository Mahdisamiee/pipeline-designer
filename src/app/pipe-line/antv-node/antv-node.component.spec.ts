import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntvNodeComponent } from './antv-node.component';

describe('AntvNodeComponent', () => {
  let component: AntvNodeComponent;
  let fixture: ComponentFixture<AntvNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AntvNodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AntvNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

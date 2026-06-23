import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtyGridComponent } from './specialty-grid.component';

describe('SpecialtyGridComponent', () => {
  let component: SpecialtyGridComponent;
  let fixture: ComponentFixture<SpecialtyGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialtyGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecialtyGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

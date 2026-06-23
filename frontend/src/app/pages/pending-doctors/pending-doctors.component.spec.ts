import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDoctorsComponent } from './pending-doctors.component';

describe('PendingDoctorsComponent', () => {
  let component: PendingDoctorsComponent;
  let fixture: ComponentFixture<PendingDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingDoctorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PendingDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

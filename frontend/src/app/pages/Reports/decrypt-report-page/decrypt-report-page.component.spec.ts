import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecryptReportPageComponent } from './decrypt-report-page.component';

describe('DecryptReportPageComponent', () => {
  let component: DecryptReportPageComponent;
  let fixture: ComponentFixture<DecryptReportPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecryptReportPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DecryptReportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

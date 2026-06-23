import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadReportPageComponent } from './upload-report-page.component';

describe('UploadReportPageComponent', () => {
  let component: UploadReportPageComponent;
  let fixture: ComponentFixture<UploadReportPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadReportPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadReportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

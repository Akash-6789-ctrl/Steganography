import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReportsPageComponent } from './view-reports-page.component';

describe('ViewReportsPageComponent', () => {
  let component: ViewReportsPageComponent;
  let fixture: ComponentFixture<ViewReportsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewReportsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewReportsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoConsultComponentComponent } from './video-consult-component.component';

describe('VideoConsultComponentComponent', () => {
  let component: VideoConsultComponentComponent;
  let fixture: ComponentFixture<VideoConsultComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoConsultComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoConsultComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

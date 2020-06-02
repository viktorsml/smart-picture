import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartPictureComponent } from './smart-picture.component';

describe('SmartPictureComponent', () => {
  let component: SmartPictureComponent;
  let fixture: ComponentFixture<SmartPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SmartPictureComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartPictureComponent);
    component = fixture.componentInstance;
    component.settings = {
      isResponsive: true,
      source: {
        main: {
          type: 'webp',
          url: 'https://picsum.photos/1140/647?random=1.webp',
        },
        fallback: {
          type: 'jpg',
          url: 'https://picsum.photos/1140/647?random=5.webp',
        },
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

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
  });

  it('should load when there is defined a "src" and "type" properties via manual input', () => {
    component.src = '/some/image.png';
    component.type = 'image/png';
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load when there is defined a "src" and "type" properties via object binding', () => {
    component.settings = {
      src: {
        url: '/some/image.png',
        type: 'image/png',
      },
    };
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});

import { Component } from '@angular/core';
import { SmartPictureSettings } from 'projects/smart-picture/src/lib/smart-picture.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public defaultImage: SmartPictureSettings = {
    source: { main: { url: 'https://picsum.photos/200/300.jpg', type: 'jpg' } },
    disableLazyLoad: true,
    objectPosition: 'center',
    isResponsive: false,
    size: 'cover',
  };
}

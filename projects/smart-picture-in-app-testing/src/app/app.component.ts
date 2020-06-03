import { Component } from '@angular/core';
import { SmartPictureSettings, PictureLoadEvent } from 'projects/smart-picture/src/lib/smart-picture.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public randomImageUrl(seed: string): SmartPictureSettings {
    const API = `https://picsum.photos/seed/${seed}`;
    const SIZE = '/800/600';
    return {
      src: {
        url: `${API}${SIZE}.webp`,
        type: 'image/webp',
        fallbackUrl: `${API}${SIZE}.jpg`,
        fallbackType: 'image/jpeg',
      },
      objectFit: 'cover',
      widthRatio: 16,
      heightRatio: 9,
    };
  }

  public onPictureLoaded(event: PictureLoadEvent): void {
    console.log(event);
  }
}

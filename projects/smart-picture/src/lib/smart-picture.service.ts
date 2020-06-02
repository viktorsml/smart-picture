// import objectFitImages from 'object-fit-images';

import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SmartPictureService {
  private isInitialized = false;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  public initializeSmartPictureService(): void {
    if (!this.isInitialized && this.isBrowser) {
      // objectFitImages('img.fit-image');
      this.isInitialized = true;
    }
  }
}

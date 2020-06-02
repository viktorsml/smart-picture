import { animate, style, transition, trigger } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostBinding, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';

import { SmartPictureSettings } from './smart-picture.interfaces';
import { SmartPictureService } from './smart-picture.service';

@Component({
  selector: 'lib-smart-picture',
  templateUrl: './smart-picture.component.html',
  styleUrls: ['./smart-picture.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [style({ opacity: '0' }), animate('.5s cubic-bezier(.17,.67,.83,.67)', style({ opacity: '1' }))]),
    ]),
  ],
})
export class SmartPictureComponent implements OnInit {
  public shouldPictureLoad: boolean;
  private isBrowser: boolean;
  private readonly defaultSettings: SmartPictureSettings;
  @Input() public settings: SmartPictureSettings;
  @HostBinding('style.--aspect-ratio') public aspectRatio: string;
  @HostBinding('class.isResponsive') public responsiveStatus: boolean;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: object,
    private readonly sps: SmartPictureService,
    private readonly el: ElementRef
  ) {
    this.shouldPictureLoad = false;
    this.defaultSettings = {
      source: {
        main: { url: '', type: 'jpg' },
      },
      isResponsive: false,
      size: 'initial',
      disableLazyLoad: false,
      disablePlaceholder: false,
    };
  }

  public ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.sps.initializeSmartPictureService();
    this.settings = { ...this.defaultSettings, ...this.settings };
    this.responsiveStatus = this.settings.isResponsive;
    if (this.settings.isResponsive) {
      this.aspectRatio = `${this.settings.heightRatio / (this.settings.widthRatio / 100)}%`;
    }
    this.lazyLoadImage((wasLazyLoaded: boolean) => {
      // console.log(`${this.settings.source.main.url}: Was lazy loaded?: ${wasLazyLoaded}`);
    });
  }

  private lazyLoadImage(whenDone: (canLazyLoad: boolean) => void): void {
    const canLazyLoad = this.isBrowser ? window && 'IntersectionObserver' in window && !this.settings.disableLazyLoad : false;
    if (!canLazyLoad) {
      this.loadImage();
      if (typeof whenDone === 'function') {
        whenDone(canLazyLoad);
      }
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ isIntersecting }) => {
        if (isIntersecting) {
          this.loadImage();
          if (typeof whenDone === 'function') {
            whenDone(canLazyLoad);
          }
          observer.unobserve(this.el.nativeElement);
        }
      });
    });
    observer.observe(this.el.nativeElement);
  }

  private loadImage(): void {
    this.shouldPictureLoad = true;
  }

  public reformatType(type: string): string {
    return `image/${type}`;
  }
}

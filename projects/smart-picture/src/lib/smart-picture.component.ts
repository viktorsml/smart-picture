import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostBinding, Inject, Input, OnInit, PLATFORM_ID, Output, EventEmitter } from '@angular/core';

import { SmartPictureSettings, MIMEType, ObjectFitValues, PictureLoadEvent } from './smart-picture.interfaces';
import { DEFAULT_SETTINGS } from './smart-picture.defaults';

@Component({
  selector: 'ng-smart-picture',
  templateUrl: './smart-picture.component.html',
  styleUrls: ['./smart-picture.component.scss'],
})
export class SmartPictureComponent implements OnInit {
  public isBrowser: boolean;
  public shouldPictureLoad = false;
  public pictureSettings: SmartPictureSettings;
  @Input() private settings: SmartPictureSettings;
  @Input() private src: string = DEFAULT_SETTINGS.src.url;
  @Input() private type: MIMEType = DEFAULT_SETTINGS.src.type;
  @Input() private fallbackSrc: string = DEFAULT_SETTINGS.src.fallbackUrl;
  @Input() private fallbackType: MIMEType = DEFAULT_SETTINGS.src.fallbackType;
  @Input() private alt: string = DEFAULT_SETTINGS.alt;
  @Input() private ariaHidden: boolean = DEFAULT_SETTINGS.ariaHidden;
  @Input() private lazyLoad: boolean = DEFAULT_SETTINGS.lazyLoad;
  @Input() private heightRatio: number = DEFAULT_SETTINGS.heightRatio;
  @Input() private widthRatio: number = DEFAULT_SETTINGS.widthRatio;
  @Input() private objectFit: ObjectFitValues = DEFAULT_SETTINGS.objectFit;
  @Input() private objectPosition: string = DEFAULT_SETTINGS.objectPosition;
  @Output() public pictureLoaded: EventEmitter<PictureLoadEvent> = new EventEmitter<PictureLoadEvent>();
  @HostBinding('style.--object-fit') public bindObjectFit: string;
  @HostBinding('style.--object-position') public bindObjectPosition: string;
  @HostBinding('style.--aspect-ratio') public aspectRatio: string;
  @HostBinding('class.isResponsive') public isResponsive: boolean;

  constructor(private readonly el: ElementRef, @Inject(PLATFORM_ID) private readonly platformId: any) {}

  public ngOnInit(): void {
    this.pictureSettings = this.getPictureSettings();
    this.bindObjectFit = this.pictureSettings.objectFit ? this.pictureSettings.objectFit : 'initial';
    this.bindObjectPosition = this.pictureSettings.objectPosition ? this.pictureSettings.objectPosition : '50% 50%';
    this.isResponsive = this.isValidAspectRatio(this.pictureSettings.widthRatio, this.pictureSettings.heightRatio);
    if (this.isResponsive) {
      this.aspectRatio = `${this.pictureSettings.heightRatio / (this.pictureSettings.widthRatio / 100)}%`;
    }
    this.loadImage(this.pictureSettings)
      .then((wasLazyLoaded) => {
        this.pictureLoaded.emit({
          wasLazyLoaded,
          settings: this.pictureSettings,
        });
      })
      .catch(console.error);
  }

  private getPictureSettings(): SmartPictureSettings {
    const manualInput: SmartPictureSettings = {
      src: {
        url: this.src,
        type: this.type,
        fallbackUrl: this.fallbackSrc,
        fallbackType: this.fallbackType,
      },
      alt: this.alt,
      ariaHidden: this.ariaHidden,
      lazyLoad: this.lazyLoad,
      heightRatio: this.heightRatio,
      widthRatio: this.widthRatio,
      objectFit: this.objectFit,
      objectPosition: this.objectPosition,
    };
    return { ...DEFAULT_SETTINGS, ...manualInput, ...this.settings };
  }

  private loadImage(settings: SmartPictureSettings): Promise<boolean> {
    const canLazyLoad = isPlatformBrowser(this.platformId) ? window && 'IntersectionObserver' in window : false;
    return new Promise((resolve, reject) => {
      if (!canLazyLoad && !settings.lazyLoad) {
        this.shouldPictureLoad = true;
        resolve(canLazyLoad);
      } else {
        this.createObserver(() => {
          this.shouldPictureLoad = true;
          resolve(canLazyLoad);
        });
      }
    });
  }

  private isValidAspectRatio(widthRatio: number | null, heightRatio: number | null): boolean {
    if (typeof widthRatio === 'object' || typeof heightRatio === 'object') {
      return false;
    }
    if (widthRatio <= 0 || heightRatio <= 0) {
      throw Error(`Please provide a valid number above 0 for the properties 'heightRatio' and 'widthRatio'.
      Values provided:\n-> widthRatio: ${widthRatio}\n-> heightRatio: ${heightRatio}`);
    }
    return true;
  }

  private createObserver(whenIsObserved: () => void): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ isIntersecting }) => {
        if (isIntersecting) {
          whenIsObserved();
          observer.unobserve(this.el.nativeElement);
        }
      });
    });
    observer.observe(this.el.nativeElement);
  }
}

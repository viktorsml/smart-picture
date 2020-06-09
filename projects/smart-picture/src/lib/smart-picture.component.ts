import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostBinding, Inject, Input, OnInit, PLATFORM_ID, Output, EventEmitter } from '@angular/core';

import { SmartPictureSettings, MIMEType, ObjectFitValues, PictureLoadEvent } from './smart-picture.interfaces';
import { DEFAULT_SETTINGS } from './smart-picture.defaults';
import { InvalidInputError } from './error/invalid-input.error';
import { Validator } from './smart-picture.validators';
import { InvalidAspectRatioError } from './error/invalid-aspect-ratio.error';

@Component({
  selector: 'ng-smart-picture',
  templateUrl: './smart-picture.component.html',
  styleUrls: ['./smart-picture.component.scss'],
})
export class SmartPictureComponent implements OnInit {
  public isBrowser: boolean;
  public shouldPictureLoad = false;
  public pictureSettings: SmartPictureSettings = {};
  @Input() public settings: SmartPictureSettings = {};
  @Input() public src: string = DEFAULT_SETTINGS.src.url;
  @Input() public type: MIMEType = DEFAULT_SETTINGS.src.type;
  @Input() public fallbackSrc: string = DEFAULT_SETTINGS.src.fallbackUrl;
  @Input() public fallbackType: MIMEType = DEFAULT_SETTINGS.src.fallbackType;
  @Input() public alt: string = DEFAULT_SETTINGS.alt;
  @Input() public ariaHidden: boolean = DEFAULT_SETTINGS.ariaHidden;
  @Input() public lazyLoad: boolean = DEFAULT_SETTINGS.lazyLoad;
  @Input() public heightRatio: number = DEFAULT_SETTINGS.heightRatio;
  @Input() public widthRatio: number = DEFAULT_SETTINGS.widthRatio;
  @Input() public objectFit: ObjectFitValues = DEFAULT_SETTINGS.objectFit;
  @Input() public objectPosition: string = DEFAULT_SETTINGS.objectPosition;
  @Output() public pictureLoaded: EventEmitter<PictureLoadEvent> = new EventEmitter<PictureLoadEvent>();
  @HostBinding('style.--object-fit') public bindObjectFit: string;
  @HostBinding('style.--object-position') public bindObjectPosition: string;
  @HostBinding('style.--aspect-ratio') public bindAspectRatio: string;
  @HostBinding('class.isResponsive') public bindIsResponsive: boolean;

  constructor(public readonly el: ElementRef, @Inject(PLATFORM_ID) public readonly platformId: any) {}

  public ngOnInit(): void {
    const settings = this.processSettings();
    this.loadImage(settings)
      .then((wasLazyLoaded) => this.pictureLoaded.emit({ wasLazyLoaded, settings }))
      .catch(console.error);
  }

  public mergeSettings(): SmartPictureSettings {
    const manualSource = {
      url: this.src,
      type: this.type,
      fallbackUrl: this.fallbackSrc,
      fallbackType: this.fallbackType,
    };
    const manualInputSettings: SmartPictureSettings = {
      alt: this.alt,
      ariaHidden: this.ariaHidden,
      lazyLoad: this.lazyLoad,
      heightRatio: this.heightRatio,
      widthRatio: this.widthRatio,
      objectFit: this.objectFit,
      objectPosition: this.objectPosition,
    };
    const mergedSource = { ...DEFAULT_SETTINGS.src, ...manualSource, ...this.settings.src };
    let mergedSettings = { ...DEFAULT_SETTINGS, ...manualInputSettings, ...this.settings };
    mergedSettings.src = mergedSource;
    return mergedSettings;
  }

  public validateInputValues(s: SmartPictureSettings): void {
    if (!Validator.isValidImageUrl(s.src.url, { isRequired: true })) {
      throw new InvalidInputError('image source value is not a valid string.', s.src.url);
    }
    if (!Validator.isValidMIMEType(s.src.type, { isRequired: true })) {
      throw new InvalidInputError('image type value is not a valid image MIMEType.', s.src.type, Validator.MIMETypes);
    }
    if (!Validator.isValidImageUrl(s.src.fallbackUrl, { isRequired: false })) {
      throw new InvalidInputError('fallback image source value is not a valid string', s.src.fallbackUrl);
    }
    if (s.src.fallbackUrl && !Validator.isValidMIMEType(s.src.fallbackType, { isRequired: true })) {
      throw new InvalidInputError('fallback image type value is not a valid image MIMEType.', s.src.fallbackType, Validator.MIMETypes);
    }
    if (!Validator.isValidString(s.alt)) {
      throw new InvalidInputError('alt attribute value is not a valid string.', s.alt);
    }
    if (!Validator.isBoolean(s.ariaHidden)) {
      throw new InvalidInputError('ariaHidden attribute value is not a boolean.', s.ariaHidden);
    }
    if (!Validator.isBoolean(s.lazyLoad)) {
      throw new InvalidInputError('lazyLoad attribute value is not a boolean.', s.lazyLoad);
    }
    if (!Validator.isValidObjectFitValue(s.objectFit)) {
      throw new InvalidInputError('objectFit value is not valid.', s.objectFit, Validator.objectFitValues);
    }
    if (!Validator.isValidString(s.objectPosition)) {
      throw new InvalidInputError('objectPosition attribute value is not a valid string.', s.objectPosition);
    }
    if (!Validator.areValidAspectRatioValues(s.widthRatio, s.heightRatio)) {
      throw new InvalidAspectRatioError(s.widthRatio, s.heightRatio);
    }
  }

  public bindProperties(settings: SmartPictureSettings): void {
    this.bindObjectFit = settings.objectFit;
    this.bindObjectPosition = settings.objectPosition;
    this.bindIsResponsive = Validator.isValidAspectRatio(settings.widthRatio, settings.heightRatio);
    this.bindAspectRatio = this.bindIsResponsive ? `${settings.heightRatio / (settings.widthRatio / 100)}%` : null;
  }

  public processSettings(): SmartPictureSettings {
    const mergedSettings = this.mergeSettings();
    this.validateInputValues(mergedSettings);
    this.bindProperties(mergedSettings);
    return mergedSettings;
  }

  public renderImage(settings: SmartPictureSettings): Promise<void> {
    return new Promise((resolve) => {
      this.pictureSettings = settings;
      this.shouldPictureLoad = true;
      resolve();
    });
  }

  public loadImage(settings: SmartPictureSettings): Promise<boolean> {
    const canLazyLoad = isPlatformBrowser(this.platformId) ? window && 'IntersectionObserver' in window : false;
    const shouldLazyLoad = canLazyLoad && settings.lazyLoad;
    return new Promise((resolve) => {
      if (shouldLazyLoad) {
        this.createObserver(() => this.renderImage(settings).then(() => resolve(true)));
      } else {
        this.renderImage(settings).then(() => resolve(false));
      }
    });
  }

  public createObserver(whenIsObserved: () => void): void {
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

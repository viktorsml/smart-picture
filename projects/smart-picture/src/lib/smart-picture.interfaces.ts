// filetypes from https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
export type MIMEType =
  | 'image/jpeg'
  | 'image/apng'
  | 'image/bmp'
  | 'image/gif'
  | 'image/x-icon'
  | 'image/png'
  | 'image/svg+xml'
  | 'image/tiff'
  | 'image/webp';

export type ObjectFitValues = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down' | 'inherit' | 'initial' | 'unset';
export interface SmartPictureSettings {
  src?: {
    url: string;
    type: MIMEType;
    fallbackUrl?: string;
    fallbackType?: MIMEType;
  };
  alt?: string;
  ariaHidden?: boolean;

  lazyLoad?: boolean;

  heightRatio?: number;
  widthRatio?: number;

  objectFit?: ObjectFitValues;
  objectPosition?: string;
}

export interface PictureLoadEvent {
  wasLazyLoaded: boolean;
  settings: SmartPictureSettings;
}

export interface SmartPictureSettings {
  source: {
    main: {
      url: string;
      type: string;
    };
    fallback?: {
      url: string;
      type: string;
    };
  };
  alt?: string;
  ariaHidden?: string;

  isResponsive?: boolean;
  disablePlaceholder?: boolean;
  disableLazyLoad?: boolean;

  objectPosition?: string;
  size?: 'initial' | 'cover' | 'contain';
  heightRatio?: number;
  widthRatio?: number;
}

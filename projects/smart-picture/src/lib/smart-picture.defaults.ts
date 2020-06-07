import { SmartPictureSettings } from './smart-picture.interfaces';

export const DEFAULT_SETTINGS: SmartPictureSettings = {
  src: {
    url: null,
    type: null,
    fallbackUrl: null,
    fallbackType: null,
  },
  alt: '',
  ariaHidden: false,
  lazyLoad: true,
  heightRatio: null,
  widthRatio: null,
  objectFit: 'contain',
  objectPosition: 'center',
};

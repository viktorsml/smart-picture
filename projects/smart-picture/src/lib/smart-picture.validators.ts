import { MIMEType } from './smart-picture.interfaces';
import { ObjectFitValues } from 'smart-picture';

export interface ValidatorModifiers {
  isRequired?: boolean;
}

export class Validator {
  public static readonly objectFitValues = ['fill', 'contain', 'cover', 'none', 'scale-down', 'inherit', 'initial', 'unset'];
  public static readonly MIMETypes = [
    'image/jpeg',
    'image/apng',
    'image/bmp',
    'image/gif',
    'image/x-icon',
    'image/png',
    'image/svg+xml',
    'image/tiff',
    'image/webp',
  ];

  public static isValidImageUrl(imageUrl: string | null, modifiers: ValidatorModifiers = {}): boolean {
    if (!modifiers.isRequired && imageUrl === null) {
      return true;
    }
    if (typeof imageUrl !== 'string') {
      return false;
    }
    if (modifiers.isRequired && imageUrl.length <= 0) {
      return false;
    }
    return true;
  }

  public static isValidMIMEType(imageType: MIMEType | null, modifiers: ValidatorModifiers = {}): boolean {
    if (!modifiers.isRequired && imageType === null) {
      return true;
    }
    return this.MIMETypes.includes(imageType);
  }

  public static isValidString(value: string): boolean {
    return typeof value === 'string' && value.length >= 0;
  }

  public static isBoolean(value: boolean): boolean {
    return typeof value === 'boolean';
  }

  public static isValidObjectFitValue(value: ObjectFitValues): boolean {
    return this.objectFitValues.includes(value);
  }

  public static areValidAspectRatioValues(widthRatio: number | null, heightRatio: number | null): boolean {
    if (widthRatio === null && heightRatio === null) {
      return true;
    }
    if (Number(widthRatio) > 0 && Number(heightRatio) > 0) {
      return true;
    }
    if (typeof widthRatio === 'number' && widthRatio > 0 && typeof heightRatio === 'number' && heightRatio > 0) {
      return true;
    }
    return false;
  }

  public static isValidAspectRatio(widthRatio: number | null, heightRatio: number | null): boolean {
    if (widthRatio > 0 && heightRatio > 0) {
      return true;
    }
    return false;
  }
}

# Smart Picture

A simple Angular library to lazy load images, make responsive images, and use next generation formats.

This library features:

- Lazy loading of images
- Usage of HTML5's picture element
- Responsive image based on custom aspect ratio

## Install

Angular 9+

```bash
$ npm install --save smart-picture
```

## Import

The first thing you need to do after installing the library is importing the `SmartPictureModule` on any Angular module you want.

For example:

> app.module.ts

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { SmartPictureModule } from 'smart-picture';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SmartPictureModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

After that you can start using the `ng-smart-picture` element on any component inside that module.

## Usage

There are two ways of loading an image using the `<ng-smart-picture></ng-smart-picture>` custom element.

- Binding a `SmartPictureSettings` object.
- Binding individual setting values.

You can also use both methods at the same time, just keep in mind that the `SmartPictureSettings` object is going to overwrite any individual binding of the same setting.

### Binding a `SmartPictureSettings` object.

For this method you need to pass to each `<ng-smart-picture></ng-smart-picture>` element a `SmartPictureSettings` object.

For example:

> app.component.ts

```typescript
import { Component } from '@angular/core';
import { SmartPictureSettings } from 'smart-picture';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public exampleImage: SmartPictureSettings = {
    src: {
      url: 'https://picsum.photos/seed/exampleImage/800/600.jpg',
      type: 'image/jpeg',
    },
  };
}
```

> app.component.html

```html
<ng-smart-picture [settings]="exampleImage"></ng-smart-picture>
```

A `SmartPictureSettings` object with all settings looks like this:

```typescript
const exampleWithAllSettings: SmartPictureSettings = {
  src: {
    url: 'https://picsum.photos/seed/exampleImage/800/600.webp',
    type: 'image/webp',
    fallbackUrl: 'https://picsum.photos/seed/exampleImage/800/600.jpg',
    fallbackType: 'image/jpeg',
  },
  alt: 'An example image',
  ariaHidden: false,
  lazyLoad: true,
  heightRatio: 1,
  widthRatio: 1,
  objectFit: 'cover',
  objectPosition: 'center',
};
```

### Binding individual setting values

If you can't or don't want to have a `SmartPictureSettings` object you can also bind individual setting values.

For example:

> app.component.html

```html
<ng-smart-picture src="https://picsum.photos/seed/exampleImage/800/600.jpg" type="image/jpeg"></ng-smart-picture>
```

A `ng-smart-picture` element with all setting properties looks like:

```html
<ng-smart-picture
  src="https://picsum.photos/seed/exampleImage/800/600.webp"
  type="image/webp"
  fallbackSrc="https://picsum.photos/seed/exampleImage/800/600.jpg"
  fallbackType="image/jpeg"
  alt="An example image"
  [ariaHidden]="true"
  [lazyLoad]="true"
  [heightRatio]="1"
  [widthRatio]="1"
  objectFit="cover"
  objectPosition="center"
></ng-smart-picture>
```

> ℹ️ Almost all attributes have the same name as the properties of the `SmartPictureSettings` object with the exception of `src.url`, `src.type`, `src.fallbackUrl` and `src.fallbackType` which correspond to `src`, `type`, `fallbackSrc` and `fallbackType` respectively.

## Settings

| Attribute or property                                                    | Value Type                                                                                           | Default Value | Description                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src` (`src.url` on the `SmartPictureSettings` object)                   | string                                                                                               | null          | Path or url to the image that is going to be loaded.                                                                                                                                                                                                                                                                           |
| `type` (`src.type` on the `SmartPictureSettings` object)                 | [MIME type](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types)                  | null          | Specifies the image file format of the image specified on the `src` or `src.url` on the `SmartPictureSettings` object.                                                                                                                                                                                                         |
| `fallbackSrc` (`src.fallbackUrl` on the `SmartPictureSettings` object)   | string                                                                                               | null          | If the image specified on the `src` or `src.url` on the `SmartPictureSettings` object is not supported on all browsers you can pass a path or url to a fallback image using this property.                                                                                                                                     |
| `fallbackType` (`src.fallbackType` on the `SmartPictureSettings` object) | [MIME type](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types)                  | null          | Specifies the image file format of the image specified on the `fallbackSrc` or `src.fallbackUrl` on the `SmartPictureSettings` object.                                                                                                                                                                                         |
| `alt`                                                                    | string                                                                                               | ''            | Specifies an alternate text for an image to describe the appearance and function of an image on a page. Visit the [`img` element documentation](https://developer.mozilla.org/es/docs/Web/HTML/Elemento/img) for more information.<br /><br />This renders as the `alt` attribute for the `img` element:<br />`<img alt="" />` |
| `ariaHidden`                                                             | boolean                                                                                              | false         | Controls the `aria-hidden` attrubute for the `img` element. Visit the [usage of the aria-hidden attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-hidden_attribute) guide for more information.                                                                        |
| `lazyLoad`                                                               | boolean                                                                                              | true          | If **lazyLoad** is true the component will use an [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) (if it is supported by the browser) to only render the picture element if the component is in view.                                                                       |
| `heightRatio`                                                            | number                                                                                               | null          | Provides a _y_ units height number for the calculation of the image aspect ratio.<br />This allows the image to be rezised and keeping the aspect ratio consistent.<br /><br />ℹ️ You must also provide a `widthRatio` value.                                                                                                  |
| `widthRatio`                                                             | number                                                                                               | null          | Provides a _x_ units width number for the calculation of the image aspect ratio.<br />This allows the image to be rezised and keeping the aspect ratio consistent.<br /><br />ℹ️ You must also provide a `heightRatio` value.                                                                                                  |
| `objectFit`                                                              | 'fill'<br/>'contain'<br/>'cover'<br/>'none'<br/>'scale-down'<br/>'inherit'<br/>'initial'<br/>'unset' | 'contain'     | Specifies the value for the CSS property `object-fit`. Useful to adapt the image content when using the aspect ratio technique. For more information about the CSS property visit the [`object-fit` documentation](https://developer.mozilla.org/es/docs/Web/CSS/object-fit).                                                  |
| `objectPosition`                                                         | string                                                                                               | 'center'      | Specifies the value for the CSS property `object-position`. Useful to align the image when using the aspect ratio technique. For more information about the CSS property visit the [`object-position` documentation](https://developer.mozilla.org/es/docs/Web/CSS/object-position).                                           |

### The `SmartPictureSettings` interface

You can import the interface like this:

```typescript
import { SmartPictureSettings } from 'smart-picture';
```

This interface has the following structure:

```typescript
interface SmartPictureSettings {
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
  objectPosition?: string; // See https://developer.mozilla.org/es/docs/Web/CSS/object-position for more information
}

// See https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types for more information
type MIMEType =
  | 'image/jpeg'
  | 'image/apng'
  | 'image/bmp'
  | 'image/gif'
  | 'image/x-icon'
  | 'image/jpeg'
  | 'image/png'
  | 'image/svg+xml'
  | 'image/tiff'
  | 'image/webp';

// See https://developer.mozilla.org/es/docs/Web/CSS/object-fit for more information
export type ObjectFitValues = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down' | 'inherit' | 'initial' | 'unset';
```

## The `pictureLoaded` event

This event is fired every time a picture loads and is usefull if you want to run some code after a lazy loaded image load.

First you need to make a method on your component that will run every time a image with the event attached loads.

```typescript
import { Component } from '@angular/core';
import { PictureLoadEvent } from 'smart-picture';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public onPictureLoaded(event: PictureLoadEvent): void {
    // here goes your code
  }
}
```

Then attach the method to the `pictureLoaded` event like this:

```html
<ng-smart-picture
  src="https://picsum.photos/seed/exampleImage/800/600.webp"
  type="image/webp"
  [lazyLoad]="true"
  (pictureLoaded)="onPictureLoaded($event)"
></ng-smart-picture>
```

This will run the function `onPictureLoaded()` when the image loads and pass the `PictureLoadEvent` to the function.

The `PictureLoadEvent` is an object with the following structure:

```typescript
interface PictureLoadEvent {
  wasLazyLoaded: boolean; // is true if the image was lazy loaded and false if it was not or if the browser does not support the IntersectionObserver API
  settings: SmartPictureSettings;
}
```

## Binding `source` elements for the `picture` element

By default every `ng-smart-picture` element will have inside a ``picture`element and if you need to pass a`source`element child of`picture`you can just put it inside the`ng-smart-picture` like this.

```html
<ng-smart-picture src="https://picsum.photos/seed/exampleImage/800/800.webp" type="image/webp">
  <source srcset="https://picsum.photos/seed/exampleImage2/600/600.webp" type="image/webp" media="(min-width: 600px)" />
</ng-smart-picture>
```

For more information about the `source` and `picture` element visit the [`<picture>` documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Elemento/picture).

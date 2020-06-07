import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SmartPictureComponent } from './smart-picture.component';

// @dynamic
@NgModule({
  declarations: [SmartPictureComponent],
  imports: [CommonModule, BrowserAnimationsModule],
  exports: [SmartPictureComponent],
})
export class SmartPictureModule {}

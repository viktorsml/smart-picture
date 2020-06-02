import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SmartPictureComponent } from './smart-picture.component';
import { SmartPictureService } from './smart-picture.service';

@NgModule({
  declarations: [SmartPictureComponent],
  imports: [CommonModule, BrowserAnimationsModule],
  providers: [SmartPictureService],
  exports: [SmartPictureComponent],
})
export class SmartPictureModule {}

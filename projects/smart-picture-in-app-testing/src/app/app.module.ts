import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SmartPictureModule } from 'projects/smart-picture/src/public-api';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SmartPictureModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

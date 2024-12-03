import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app/app.routes';


bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(AppRoutingModule, BrowserAnimationsModule)],
}).catch((err) => console.error(err));
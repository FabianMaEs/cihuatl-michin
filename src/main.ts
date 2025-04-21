import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app/app.routes';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web/build/player/lottie_svg';


bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(AppRoutingModule, BrowserAnimationsModule, HttpClientModule),
    importProvidersFrom(MarkdownModule.forRoot()),
    provideLottieOptions({
      player: () => player,
    }),
  ],
}).catch((err) => console.error(err));
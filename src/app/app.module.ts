import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {MaterialModule} from './material/material.module';
import {TemplateModule} from './template/template.module';
import {AuthServiceConfig, FacebookLoginProvider} from 'angularx-social-login';
import {CommonModule} from '@angular/common';
import {AuthentificationComponent} from './component/authentification/authentification.component';
import {ReactiveFormsModule} from '@angular/forms';

const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('136528944341307')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    TemplateModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[AuthentificationComponent]
})
export class AppModule { }

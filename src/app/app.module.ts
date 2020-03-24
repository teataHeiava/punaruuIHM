import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {MaterialModule} from './material/material.module';
import {TemplateModule} from './template/template.module';
import {CommonModule} from '@angular/common';
import {AuthentificationComponent} from './component/authentification/authentification.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpInterceptor} from './services/interceptor/http-interceptor';
import {SectionComponent} from './component/section/section.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent,
    SectionComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    TemplateModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true},
    {provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent],
  entryComponents:[AuthentificationComponent]
})
export class AppModule { }

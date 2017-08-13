import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';
import { AuthenticateXHRBackend } from './authenticate-xhr.backend';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { AccountModule }  from './account/account.module';

import { ConfigService } from './shared/utils/config.service';

import { MaterialModule } from '@angular/material';
import { MasonryModule } from 'angular2-masonry';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		HomeComponent
	],
	imports: [
		AccountModule,
		BrowserModule,
		FormsModule,
		HttpModule,
		MaterialModule,
		MasonryModule,
		BrowserAnimationsModule,
		routing
	],
	providers: [
		ConfigService, {
			provide: XHRBackend,
			useClass: AuthenticateXHRBackend
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

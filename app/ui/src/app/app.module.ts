import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';
import { AuthenticateXHRBackend } from './authenticate-xhr.backend';

import { MaterialModule } from '@angular/material';
import { MasonryModule } from 'angular2-masonry';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { AccountModule }  from './account/account.module';
import { DashboardModule }  from './dashboard/dashboard.module';

import { ConfigService } from './shared/utils/config.service';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		HomeComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		MaterialModule,
		MasonryModule,
		BrowserAnimationsModule,
		AccountModule,
		DashboardModule,
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

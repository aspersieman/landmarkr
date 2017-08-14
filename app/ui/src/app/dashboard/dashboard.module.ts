import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { SharedModule }       from '../shared/modules/shared.module';

import { MaterialModule } from '@angular/material';
import { MasonryModule } from 'angular2-masonry';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routing }  from './dashboard.routing';
import { RootComponent } from './root/root.component';
import { HomeComponent } from './home/home.component';
import { ImageListComponent } from '../image-list/image-list.component';
import { LocationListComponent } from '../location-list/location-list.component';

import { DashboardService } from './services/dashboard.service';
import { ImageService } from './services/image.service';
import { LocationService } from './services/location.service';

import { AuthGuard } from '../auth.guard';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		MaterialModule,
		MasonryModule,
		BrowserAnimationsModule,
		routing,
		SharedModule
	],
	declarations: [
		RootComponent,
		HomeComponent,
		ImageListComponent,
		LocationListComponent
	],
	exports: [ ],
	providers: [
		AuthGuard,
		DashboardService,
		ImageService,
		LocationService
	]
})
export class DashboardModule { }

import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';

import { RootComponent }    from './root/root.component';
import { HomeComponent }    from './home/home.component';
import { ImageListComponent }    from '../image-list/image-list.component';

import { AuthGuard } from '../auth.guard';

export const routing: ModuleWithProviders = RouterModule.forChild([
	{
		path: 'dashboard',
		component: RootComponent, canActivate: [AuthGuard],

		children: [
			{ path: '', component: HomeComponent },
			{ path: 'home',  component: HomeComponent },
			{ path: 'home/:name',  component: ImageListComponent },
		]
	}
]);


import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../../shared/services/user.service';

@Component({
	selector: 'app-root',
	templateUrl: './root.component.html',
	styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit, OnDestroy {

	status: boolean;
	subscription:Subscription;

	constructor(private userService:UserService) { }

	ngOnInit() {
		this.subscription = this.userService.authNavStatus$.subscribe(status => this.status = status);
	}

	logout() {
		this.userService.logout();
	}

	ngOnDestroy() {
		// prevent memory leak when component is destroyed
		this.subscription.unsubscribe();
	}

}

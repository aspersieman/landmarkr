import { Component, OnInit } from '@angular/core';
import { LocationService } from '../dashboard/services/location.service';

@Component({
	selector: 'app-location-list',
	templateUrl: './location-list.component.html',
	styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {
	locations: any[];
	locationsCount: any;
	locationsFound: boolean = false;
	searching: boolean = false;

	handleSuccess(data){
		this.locationsFound = true;
		this.locations = data;
		this.locationsCount = Object.keys(data).length;
		console.log(data);
	}

	handleError(error){
		console.log(error);
	}

	constructor(private _locationService : LocationService) { }

	searchLocations(query: string) {
		this.searching = true;
		return this._locationService.getLocation(query).subscribe(
			data => this.handleSuccess(data),
			error => this.handleError(error),
			() => this.searching = false
		)
	}

	getLocationUrl(searchTerm: string) {
		return '/dashboard/home/' + encodeURI(searchTerm);
	}

	ngOnInit() {
	}

}

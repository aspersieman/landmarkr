import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { ConfigService } from '../../shared/utils/config.service';

@Injectable()
export class LocationService{
	baseUrl: string = '';

	constructor(private http: Http, private configService: ConfigService){
		this.baseUrl = configService.getApiURI();
	}

	getLocation(name){
		let getHeaders = new Headers();
		getHeaders.append('Accept', 'application/json');
		getHeaders.append('Content-Type', 'application/json');
		getHeaders.append('Authorization', 'Bearer '+localStorage.getItem('auth_token'));
		let params = new URLSearchParams();
		let options = new RequestOptions({ headers: getHeaders, params: params });
		return this.http.get(
				this.baseUrl + '/locations/foursquare/' + name,
				options
			)
			.map(res => res.json());
	}

}

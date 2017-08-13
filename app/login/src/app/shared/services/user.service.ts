import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { UserRegistration } from '../models/user.registration.interface';
import { ConfigService } from '../utils/config.service';

import {BaseService} from "./base.service";

import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

@Injectable()

export class UserService extends BaseService {

	baseUrl: string = '';

	// Observable navItem source
	private _authNavStatusSource = new BehaviorSubject<boolean>(false);
	// Observable navItem stream
	authNavStatus$ = this._authNavStatusSource.asObservable();

	private loggedIn = false;

	constructor(private http: Http, private configService: ConfigService) {
		super();
		this.loggedIn = !!localStorage.getItem('auth_token');
		this._authNavStatusSource.next(this.loggedIn);
		this.baseUrl = configService.getApiURI();
	}

	register(name: string, email: string, password: string, password_confirmation: string): Observable<UserRegistration> {
		let body = JSON.stringify({ name, email, password, password_confirmation });
		let headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });

		return this.http.post(this.baseUrl + "/register", body, options)
		.map(res => true)
		.catch(this.handleError);
	}

	login(email, password) {
		let headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');

		return this.http
			.post(
				this.baseUrl + '/login',
				JSON.stringify({ "email": email, "password": password }),{ headers }
			)
			.map(res => res.json())
			.map(res => {
				localStorage.setItem('auth_token', res.data.api_token);
				this.loggedIn = true;
				this._authNavStatusSource.next(true);
				return true;
			})
			.catch(this.handleError);
	}

	logout() {
		console.log("LOGOUT");
		console.log(localStorage.getItem("auth_token"));
		let headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', 'Bearer '+localStorage.getItem('auth_token'));
		console.log(headers);
		let options = new RequestOptions({ headers: headers });

		this.http.post(this.baseUrl + "/logout", {}, options)
			.map(res => res.json())
			.catch(this.handleError)
			.subscribe();
		//localStorage.removeItem('auth_token');
		//this.loggedIn = false;
		//this._authNavStatusSource.next(false);
	}

	isLoggedIn() {
		return this.loggedIn;
	}
}


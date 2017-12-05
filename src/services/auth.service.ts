import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

import { AppConfig } from '../app/app.config';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class AuthService {
	LOGIN_URL: string = AppConfig.baseUrl + "token";

	static token: string;
	//local: Storage = new Storage();
	jwtHelper: JwtHelper = new JwtHelper();
	retrievingToken: boolean;

	contentHeader: Headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

	constructor(
		private http: Http,
		private local: Storage) {
		console.log('AuthService Instantiated...')
		AuthService.token = this.getToken();
	}

	public test() {
		return AuthService.token;
	}

	public authSuccess(token) {
		AuthService.token = token;
		this.local.set('id_token', token);
		return this.jwtHelper.decodeToken(token).given_name;
	}

	public isAuthenticated() :Promise<boolean> {
		return new Promise((resolve, reject) => {
			let isAuthenticated = tokenNotExpired(null, this.getToken());
			resolve(isAuthenticated);
		});
	}

	public _isAuthenticated(): boolean {
		return tokenNotExpired(null, this.getToken());
	}

	public getToken() {
		if (!AuthService.token && !this.retrievingToken) {
			this.retrievingToken = true;
			this.local.get('id_token').then(token => {
				this.retrievingToken = false;
				AuthService.token = token;
				//console.log(AuthService.token);
				return AuthService.token;
			});
		}
		return AuthService.token;
	}

	public login(username: string, password: string): Observable<boolean> {
		var data = "grant_type=password&username=" + username + "&password=" + password;

		return this.http.post(this.LOGIN_URL, data, { headers: this.contentHeader })
			.map((response: Response) => {
				// login successful if there's a jwt token in the response
				let token = response.json() && response.json().access_token;
				if (token) {
					// set token property
					this.authSuccess(token);
					// return true to indicate successful login
					return true;
				} else {
					// return false to indicate failed login
					return false;
				}
			})
			.catch((error: any) => {
				return Observable.throw(error);
			});
	}

	public loginSuccess(data) {
		this.authSuccess(data.json().access_token);
		return data;;
	}

	public loginError(data) {
		return Observable.throw(data);
	}

	public logout() {
		this.local.remove('id_token').then(token => {
			console.log("logout: Item removed from storage")
		});
		AuthService.token = null;
	}

	public user(): string {
		if (AuthService.token != null) {
			return this.jwtHelper.decodeToken(AuthService.token).given_name;
		}
		return null;
	}



}
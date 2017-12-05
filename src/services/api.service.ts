import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../app/app.config';
import { AuthService } from '../services/services';

export const ApiService_Config  = {
	baseUrlApiYardiAccess : AppConfig.baseUrl + 'api/YardiConnect/'
};

@Injectable()
export class ApiService {
	public baseUrlApiYardiAccess = ApiService_Config.baseUrlApiYardiAccess;
	// private baseUrlList = AppConfig.baseUrl + 'api/Lists';
	// private baseUrlUkd = AppConfig.baseUrl + 'api/Ukd';
	// private baseUrlUkdFtpStatus = AppConfig.baseUrl + 'api/UkdFtpStatus';
	// private listData = {};
	// private ukdListData = {
	// 	searchDate: null,
	// 	searchText: '',
	// 	data: null,
	// };

	constructor(
		private http: Http,
		private auth: AuthService) {
	}

	///  Headers that are used to transfer JWT and other needed headers. 
	getApiHeadersPost(): Headers {
		var contentHeader: Headers = new Headers(
			//{ 'Content-Type': 'application/json' }
		);
		contentHeader.append('Content-Type', 'application/json');
		// var token = this.auth.getToken();
		// if (token)
		// 	contentHeader.append('Authorization', 'Bearer ' + token);
		return contentHeader;
	}
	getApiHeaders(): Headers {
		var contentHeader: Headers = new Headers(
			{ 'Content-Type': 'application/x-www-form-urlencoded' }
		);
		// var token = this.auth.getToken();
		// if (token)
		// 	contentHeader.append('Authorization', 'Bearer ' + token);
		return contentHeader;
	}

	private handleErrorObservable(error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.message || error);
	}


	private userSettings = {
		date: null,
		data: null,
	};

	getUsersSettings(forceRefresh: boolean = false): Observable<any> {

		var returnValue: any = {};
		if (!forceRefresh
			&& this.userSettings.data !== null
		) {
			/// Search through any stored lists to see if one was already retrieved.  
			//AppConfig.autoComplete.minTyped;

			returnValue = this.userSettings.data;
			console.log('**no need to make HTTP call, just return the data');
			return Observable.of(returnValue);
		}

		var contentHeader = this.getApiHeaders();
		var options = new RequestOptions({ headers: contentHeader });
		var url: string = `${this.baseUrlApiYardiAccess}/Settings`;
		// return this.http.get(url, options)
		// .map(res => res.json());
		return this.http.get(url, options)
			.map(response => {
				returnValue = response.json();
				this.userSettings.date = Date();
				if (returnValue instanceof Array) {
					this.userSettings.data = returnValue[0];
					return returnValue[0];
				}
				else {
					this.userSettings.data = returnValue;
					return returnValue;
				}
				//return Observable.of(this.userSettings.data);
			}
			, (err: HttpErrorResponse) => {
				if (err.error instanceof Error) {
					// A client-side or network error occurred. Handle it accordingly.
					console.log('An error occurred:', err.error.message);
				} else {
					// The backend returned an unsuccessful response code.
					// The response body may contain clues as to what went wrong,
					console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
				}
			}
			);
	}

	save(item): Observable<any> {

		var returnValue: any = {};

		var contentHeader = this.getApiHeadersPost();
		var options = new RequestOptions({ headers: contentHeader });
		var url: string = `${this.baseUrlApiYardiAccess}/Save`;
		// let data = JSON.stringify({
		// 	obj: item,
		//  });
		// let data = {
		// 	item,
		// };
		let data = item;
		// return this.http.get(url, options)
		// .map(res => res.json());
		// return this.http.post( url, item, options)
		// 	.map( response  => response.json());
		
		return this.http.post(url, data, options)
			.map(response => {
				returnValue = response.json();
				return returnValue;
			}
			, (err: HttpErrorResponse) => {
				if (err.error instanceof Error) {
					// A client-side or network error occurred. Handle it accordingly.
					console.log('An error occurred:', err.error.message);
				} else {
					// The backend returned an unsuccessful response code.
					// The response body may contain clues as to what went wrong,
					console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
				}
			}
			);
	}
}

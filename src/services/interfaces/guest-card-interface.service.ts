//guest-card-interface.service.ts

import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';

// import 'rxjs/add/operator/map';
// import 'rxjs';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../../app/app.config';
import { ApiService, ApiService_Config } from '../../services/services';

@Injectable()
export class GuestCardInterfaceService {
	public serviceUrl = ApiService_Config.baseUrlApiYardiAccess + 'GuestCard/';

	constructor(
		private http: Http,
		private api: ApiService) {
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
		return this.api.getApiHeaders();
	}

	private properties = {
		date: null,
		data: null,
	};

	getProperties(forceRefresh: boolean = false): Observable<any> {

		var returnValue: any = {};
		if (!forceRefresh
			&& this.properties.data !== null
		) {
			/// Search through any stored lists to see if one was already retrieved.  
			//AppConfig.autoComplete.minTyped;

			returnValue = this.properties.data;
			console.log('**no need to make HTTP call, just return the data');
			return Observable.of(returnValue);
		}

		var contentHeader = this.getApiHeaders();
		var options = new RequestOptions({ headers: contentHeader });
		var url: string = `${this.serviceUrl}/Properties`;

		return this.http.get(url, options)
			.map(response => {
				returnValue = response.json();
				this.properties.date = Date();
				if (returnValue instanceof Array) {
					this.properties.data = returnValue[0];
					return returnValue[0];
				}
				else {
					this.properties.data = returnValue;
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

	private propertyUnits = {
		date: null,
		id: '',
		data: null,
	};

	unitAvailability(propertyId: string, forceRefresh: boolean = false): Observable<any> {
		
				var returnValue: any = {};
				if (!forceRefresh
					&& this.propertyUnits.data !== null
					&& this.propertyUnits.id === propertyId
				) {
					/// Search through any stored lists to see if one was already retrieved.  
					//AppConfig.autoComplete.minTyped;
		
					returnValue = this.propertyUnits.data;
					console.log('**no need to make HTTP call, just return the data');
					return Observable.of(returnValue);
				}

				this.propertyUnits.id = propertyId;

				var contentHeader = this.getApiHeaders();
				var options = new RequestOptions({ headers: contentHeader });
				//http://localhost:64692/api/YardiConnect/GuestCard/Property/UnitAvailability/001102
				var url: string = `${this.serviceUrl}Property/UnitAvailability/` + propertyId;
		
				return this.http.get(url, options)
					.map(response => {
						returnValue = response.json();
						this.propertyUnits.date = Date();
						if (returnValue instanceof Array) {
							this.propertyUnits.data = returnValue[0];
							return returnValue[0];
						}
						else {
							this.propertyUnits.data = returnValue;
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
}

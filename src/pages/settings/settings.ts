import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { ApiService } from '../../services/services'

import { Observable } from 'rxjs/Observable';

import { YardiSetting } from '../../classes/classes';

@Component({
	templateUrl: 'settings.html',
})
export class SettingsPage {
	public section: string = "basic";
	public settings: YardiSetting = new YardiSetting;
	temp : string;

	constructor(public navCtrl: NavController,
		public loadingController: LoadingController,
		private apiService: ApiService
	) {

	}

	//ionViewDidLoad
	ngOnInit() {
		let loader = this.loadingController.create({
			content: 'Getting Data...'
		});
		loader.present().then(() => {
			this.apiService.getUsersSettings()
				.subscribe(data => {
					this.settings = this.processData(data),
						loader.dismiss()
				})
		});
		
		// this.settings = Observable.create((observer: any) => {
		// 	this.apiService.getUsersSettings()
		// 		.subscribe((result: any) => {
		// 			//this.settings = result;
		// 			observer.next(result);
		// 			observer.complete();
		// 		});
		// });
	}

	processData(item){
		// item.dbServerName = "my server";
		// item.databaseName = "My Database";
		// this.apiService.save(item).subscribe(data => {
		// 	this.temp = data
		// })
		return item;
	}

	save(event){
		this.apiService.save(this.settings).subscribe(data => {
			this.settings = data;
		})
		
	}
}


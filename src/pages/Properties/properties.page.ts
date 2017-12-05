import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { GuestCardInterfaceService } from '../../services/services'

//import 'rxjs/add/operator/debounceTime';    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {          
import { RowSetting, YardiProperty } from '../../classes/classes';

class DataObject {
	items: Array<YardiProperty>;
	filtered: Array<YardiProperty>;
	sortValue : string = 'Code';
	filterValue : string = '';
}


@Component({
	selector: 'page-property',
	templateUrl: 'properties.page.html',
})


export class PropertiesPage implements OnInit {
	public section: string = "basic";
	data : DataObject = new DataObject();
	//temp : string;
	constructor(public navCtrl: NavController,
		public loadingController: LoadingController,
		//private apiService: ApiService, 
		private guestCardInterfaceService : GuestCardInterfaceService
	) {

	}

	ngOnInit() {
		console.log("properties.page: ngOnInit")
		let loader = this.loadingController.create({
			content: 'Getting Data...'
		});
		loader.present().then(() => {
			this.guestCardInterfaceService.getProperties()
				.subscribe(result => {
					this.data = this.processData(result),
					this.filterData();
					loader.dismiss();
				})
		});
		
	}

	filterData(){
		if ( !this.data.filterValue){
			this.data.filtered = this.data.items;
		} 
		else{
			this.data.filtered = this.data.items.filter(

				( item : YardiProperty, index: number) => {
					return this.checkFilter( item, this);
				}
				);
		}
		return this.data.filtered = this.sortData(this);
	}

	onInput(event){
		this.filterData();
	}

	sortData(self){
		return self.data.filtered.sort( (a : YardiProperty,b : YardiProperty) => {
			if ( a[self.data.sortValue] < b[self.data.sortValue] ) return -1;
			if ( a[self.data.sortValue] > b[self.data.sortValue] ) return 1;
			return 0;
		});
	}

	checkFilter(item : YardiProperty, self){
		return (item.MarketingName.toLowerCase().indexOf(self.data.filterValue.toLowerCase()) > -1 
				|| item.Code.indexOf(self.data.filterValue) > -1 
			);
	}

	processData(item){
		this.data.items = item.body.getPropertyConfigurationsResult.Properties.Property;
		this.data.items.forEach( function(item){
			item.setting = new RowSetting();
		});
		return this.data;
	}

	propertyUnits(item: YardiProperty){
		//alert('propertyUnits' + item.Code);
		let loader = this.loadingController.create({
			content: 'Getting Data...'
		});
		loader.present().then(() => {
			this.guestCardInterfaceService.unitAvailability(item.Code)
				.subscribe(result => {
					//item.units = result;
					item.info = result.body.unitAvailability_LoginResult.PhysicalProperty.Property;
					//this.filterData();
					item.setting.clicked = true;
					loader.dismiss();
				})
		});
	}

	save(event){
		// this.apiService.save(this.settings).subscribe(data => {
		// 	this.settings = data;
		// })
		
	}
}
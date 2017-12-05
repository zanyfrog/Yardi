import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';

import { YardiPropertyInfo, YardiPropertyILSUnit } from '../../classes/classes';

@Component({
  selector: 'property-ils-unit',
  templateUrl: 'property-ils-unit.component.html',
  //template: 'Hello World 2  Units: {{property.Information.UnitCount}}'
})
export class PropertyIlsUnitComponent implements OnInit {

  @Input('item') item: YardiPropertyILSUnit;
  itemSizePixels : string = '45px';
  itemLeasedColor: string = 'RoyalBlue';

  constructor(
	public loadingCtrl: LoadingController,
	public navCtrl: NavController,
	 
  ) {
	console.log('Hello constructor of PropertyIlsUnitComponent');
  }

  ngOnInit() {
	// let loader = this.loadingCtrl.create({
   //    content: 'Loading items...'
   //  });
	//  loader.dismiss();
		let constantSquareFeet = 3000;  // number used to be "100%" or some standard deviation
		console.log('this.item.Units.Unit.MaxSquareFeet: ' + this.item.Units.Unit.MaxSquareFeet);
		let itemSize = ( (this.item.Units.Unit.MaxSquareFeet / constantSquareFeet) * 100);
		if ( itemSize > 300) itemSize = 300;
		if ( itemSize < 10) itemSize = 10;
		this.itemSizePixels =   itemSize.toString() + 'px';
		console.log('this.item.Units.Unit.UnitLeasedStatus: ' + this.item.Units.Unit.UnitLeasedStatus);
		if ( this.item.Units.Unit.UnitLeasedStatus != 'leased' ) {
			this.itemLeasedColor = 'PaleGreen';
		}
	}

}

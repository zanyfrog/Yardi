import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';

import { YardiPropertyInfo } from '../../classes/classes';

@Component({
  selector: 'property-information',
  templateUrl: 'property-information.component.html',
  //template: 'Hello World 2  Units: {{property.Information.UnitCount}}'
})
export class PropertyInformationComponent implements OnInit {

  @Input('property') property: YardiPropertyInfo;

  constructor(
	public loadingCtrl: LoadingController,
	public navCtrl: NavController,
	 
  ) {
	console.log('Hello constructor of PropertyInformationComponent');
  }

  ngOnInit() {
	let loader = this.loadingCtrl.create({
      content: 'Loading items...'
    });
	 loader.dismiss();
	}

}

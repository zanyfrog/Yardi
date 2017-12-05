import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from 'ionic-angular';

import { PropertyInformationComponent } from './property-information.component';
//import { YardiPropertyInfo } from '../../classes/classes';


@NgModule({
	declarations: [
		PropertyInformationComponent,
	],
	imports: [
		FormsModule,
		ReactiveFormsModule,
		IonicModule,
	],
	exports: [
		PropertyInformationComponent
	]
})
export class PropertyInformationComponentModule { }
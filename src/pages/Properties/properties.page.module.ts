import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
//import { PropertyInformationComponent } from '../../components/components';
// import { 
// 	PropertyInformationComponent, 
// 	//PropertyInformationComponentModule, TestComponent 
// } from '../../components/components';
import { PropertiesPage } from '../pages';

@NgModule({
  declarations: [
		PropertiesPage,
		//PropertyInformationComponent
  ],
  imports: [
	 IonicPageModule.forChild(PropertiesPage),
	 //PropertyInformationComponent,
	 //PropertyInformationComponentModule,
	 //TestComponent
  ],
  exports: [
	PropertiesPage
  ]
})
export class PropertiesPageModule {}
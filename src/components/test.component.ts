import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'testcomponent',
	template: `<h2>Hello {{name}}</h2>`
 })
 export class TestComponent implements OnInit {
	@Input() name = 'World';

	//constructor() {}

	ngOnInit() {
		console.log('component initialized'); 
	}
 }

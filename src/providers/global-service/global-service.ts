import { Injectable } from '@angular/core';

@Injectable()
export class GlobalServiceProvider {

	apiUrl = 'http://api.ciroautomotores.com.ar/api/';
	//apiUrl = 'http://127.0.0.1:8000/api/';
	//apiUrl = '/api/';
	constructor() {
		
	}
}
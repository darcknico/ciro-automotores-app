import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalServiceProvider {

	apiUrl = 'http://api.ciroautomotores.com.ar/api/';

	constructor(public http: Http) {
		
	}
}
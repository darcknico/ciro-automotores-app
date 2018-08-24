import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http,Headers,RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { PassportServiceProvider } from '../passport-service/passport-service';
import { GlobalServiceProvider } from '../global-service/global-service';
import { UserOptions } from '../../interfaces/user-options';

@Injectable()
export class UserServiceProvider {
	_favorites: string[] = [];
	HAS_LOGGED_IN = 'hasLoggedIn';
	HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
	
	constructor(
		public global: GlobalServiceProvider,
		public authProvider: PassportServiceProvider,
		public events: Events,
		private http: Http,
		public storage: Storage,
		public authHttp: HttpClient) {
	}

	login(login: {}) {
		let headers = new Headers();
		headers.append('content-type','application/json');
		let options = new RequestOptions({ headers: headers });
		return this.http.post(this.global.apiUrl+this.authProvider.loginUrl, login,options)
		.map(response => response.json())
		.map(data => {
			this.setAuth(data);
			this.getUser();
			return data.token;
		});		
	};

	private setAuth(data) {
		return this.storage.set('token', data.token);
	}

	getUser() {

		// this.http.get('https://api.github.com/users')
        // .subscribe(response => console.log(response));
        return this.authHttp.get(this.global.apiUrl+'/user'); 


		// return this.authHttp.get(this.global.apiUrl+'/user')
		// .map(response => response)
		// .map(data => {
		// 	this.setUser(data);
		// 	return data;
		// });		
	};

	getToken() {
		return this.storage.get('token').then((val) => {
			return val;
		});  
	};

	// getAccessToken() {
	// 	this.getToken().then((val) => {
	// 		let token = JSON.parse(val).access_token;
	// 		return token;
	// 	});        	
	// };
	// return this.http.get(this.url)
 //    .do(this.logResponse)
 //    .map(this.extractData)
 //    .do(this.logResponse)
 //    .catch(this.catchError)
 //    .subscribe(
 //      resultado => this.messages = resultado, // En this.messages se guardará el 
 //                                              // resultado de extractData()
 //      error => console.log(error)
 //    )
	private setUser(data) {
		return this.storage.set('user', data);
	}

	hasLoggedIn(): Promise<boolean> {
		return this.storage.get('token').then((val) => {
			if(val) {
				return true;
			}
			return false;
		});
	};

	register(login: {}) {

		return this.http.post(this.global.apiUrl+this.authProvider.registerUrl, login)
		.map(response => response.json())
		.map(data => {
			this.setAuth(data);
			this.getUser();
			return data.token;
		});		
	};

	logout(): void {
		this.storage.remove('token');
		this.storage.remove('user');
		this.events.publish('user:logout');
	};

}
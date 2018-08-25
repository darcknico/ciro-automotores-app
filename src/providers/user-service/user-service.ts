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
		headers.append('Access-Control-Allow-Origin', '*');
		headers.append('content-type','application/json');
		let options = new RequestOptions({ headers: headers });
		return this.http.post(this.global.apiUrl+this.authProvider.loginUrl, login,options)
		.map(response => response.json())
		.map(data => {
			this.setAuth(data);
			return data.token;
		});		
	};

	private setAuth(data) {
		return this.storage.set('token', data.token);
	}

	getToken() {
		return this.storage.get('token').then((val) => {
			return val;
		});  
	};

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
			return data.token;
		});		
	};

	logout(): void {
		this.storage.remove('token');
		this.storage.remove('user');
		this.events.publish('user:logout');
	};

}
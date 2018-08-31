import { Usuario } from './../../interfaces/user-options';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http} from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { PassportServiceProvider } from '../passport-service/passport-service';
import { GlobalServiceProvider } from '../global-service/global-service';

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
		public authHttp: HttpClient,) {
	}

	login(login: {}) {
		return this.http.post(this.global.apiUrl+this.authProvider.loginUrl, login)
			.map(response => response.json())
			.map(data => {
				this.setAuth(data).then(data=>{
					this.refreshUser().subscribe(data=>{},error=>{});
				});
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
	
	public refreshUser() {
		return this.authHttp.get<Usuario>(this.global.apiUrl+'details')
			.map(data => {
				this.setUser(data);
				return data;
			});	
	};

	public getUser(){
		return this.storage.get('user');
	}

	private setUser(data:Usuario) {
		return this.storage.set('user', data);
	}

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
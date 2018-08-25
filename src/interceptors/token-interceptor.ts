import { VehiculoProvider } from './../providers/vehiculo/vehiculo';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { mergeMap } from 'rxjs/operators/mergeMap';

import { Storage } from '@ionic/storage';
import { UserServiceProvider } from '../providers/user-service/user-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
 
    constructor(
		public userService: UserServiceProvider, 
		public vehiculoProvider:VehiculoProvider,
		public storage: Storage) {}

		getToken(): Promise<any> {
			return this.storage.get('token');
		}

		intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
			return fromPromise(this.getToken()).pipe(mergeMap(token => {
				request = request.clone({
		            setHeaders: {
		                Authorization: `Bearer ${token}`
		            }
		        });
				return next.handle(request);
			}));
		}
}
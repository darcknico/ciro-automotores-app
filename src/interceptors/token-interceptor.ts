import { VehiculoProvider } from './../providers/vehiculo/vehiculo';
// https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8
// src/app/auth/token-interceptor.ts
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
				// if (token) {
				// 	const newReq = req.clone(
				// 		{
				// 			headers: req.headers.set('Authorization', `Bearer ${token}`)
				// 		});
				// 	return next.handle(newReq);
				// }
				request = request.clone({
		            setHeaders: {
		                Authorization: `Bearer ${token}`
		            }
		        });
				// return next.handle(req);
				return next.handle(request);
			}));
		}

  //   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   	return fromPromise(this.userService.getToken())
  //             .switchMap(token => {
  //                  request = request.clone({
		//             setHeaders: {
		//                 Authorization: `Bearer ${data.access_token}`
		//             }
		//         });
		//         return next.handle(request);
  //            });
  // //   	this.userService.getUser().subscribe(data => {
		// // 		request = request.clone({
		// //             setHeaders: {
		// //                 Authorization: `Bearer ${data.access_token}`
		// //             }
		// //         });
		// //         return next.handle(request);
		// // 	},
		// // 	error => {
		// // 		console.log(error);
		// // });

        
  //   }
}
import { Notificacion } from './../../interfaces/notificacion';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalServiceProvider } from '../global-service/global-service';

/*
  Generated class for the NotificacionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificacionProvider {

  constructor(
    public authHttp: HttpClient,
    public global: GlobalServiceProvider,
  ){

  }

  get(limit=0){
    let url = this.global.apiUrl+'notificaciones';
    if(limit>0){
      return this.authHttp.get<Notificacion[]>(
        url,
        {
          params:
            {
              'limit':limit.toString()
            }
        }
      );
    } else {
      return this.authHttp.get<Notificacion[]>(url);
    }
  }

}

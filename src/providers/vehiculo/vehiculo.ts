import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalServiceProvider } from '../global-service/global-service';
import { CacheService } from 'ionic-cache';
import { VehiculoDisponible } from '../../interfaces/vehiculo-disponible';

/*
  Generated class for the VehiculoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VehiculoProvider {

  keyDisponibles = "vehiculos/disponibles"
  constructor(
    public authHttp: HttpClient,
    public global: GlobalServiceProvider,
    private cache: CacheService,
  ) {
    
  }

  disponibles(refresher?){
    let url = this.global.apiUrl+this.keyDisponibles;
    let req = this.authHttp.get<VehiculoDisponible[]>(url);
    let ttl = 5;
    if (refresher) {
      let delayType = 'all';
      return this.cache.loadFromDelayedObservable(url, req, this.keyDisponibles, ttl, delayType);
    } else {
      return this.cache.loadFromObservable(url, req, this.keyDisponibles, ttl);
    }
  }

  disponibleClear() {
    this.cache.clearGroup(this.keyDisponibles);
  }

}

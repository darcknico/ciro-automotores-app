import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the BaseDatosLocalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class BaseDatosLocalProvider {

  constructor(
    public http: HttpClient,
  ) {

  }

  getData() {
  }
}

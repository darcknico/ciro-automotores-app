import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalServiceProvider } from '../global-service/global-service';
import { Cliente } from '../../interfaces/cliente';

/*
  Generated class for the ClienteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClienteServiceProvider {

  api:string;
  constructor(
    public authHttp: HttpClient,
    public global: GlobalServiceProvider,
  ) {
   this.api = this.global.apiUrl+'clientes/'; 
  }

  getAll(){
    return this.authHttp.get<Cliente[]>(this.api).toPromise().then(response=>{
      let clientes = [];
      for (let index = 0; index < response.length; index++) {
        response[index].id_cliente = response[index].id;
        clientes.push( response );
      }
      return Promise.resolve( clientes );
    });
  }

  getById(id:number){
    return this.authHttp.get<Cliente>(this.api+id).toPromise().then(response=>{
      response.id_cliente = response.id;
      return Promise.resolve( response );
    });
  }

  post(item:Cliente){
    return this.authHttp.post<Cliente>(this.api,item).toPromise().then(response=>{
      response.id_cliente = response.id;
      return Promise.resolve( response );
    });
  }

  update(item:Cliente){
    return this.authHttp.put<Cliente>(this.api+item.id_cliente,item).toPromise().then(response=>{
      response.id_cliente = response.id;
      return Promise.resolve( response );
    });
  }
}

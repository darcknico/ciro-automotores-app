import { Cliente } from './../../interfaces/cliente';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the PersonaDataBaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const TABLE_NAME = 'clientes';
const CREATE_TABLE = 'CREATE TABLE IF NOT EXISTS clientes('+
  'id INTEGER PRIMARY KEY AUTOINCREMENT,'+
  'nombre TEXT,'+
  'apellido TEXT,'+
  'contacto TEXT,'+
  'observaciones TEXT,'+
  'uuid TEXT,'+
  'created_at TEXT,'+
  'updated_at TEXT,'+
  'id_cliente INTEGER'+
  ') ';
@Injectable()
export class ClienteDataBaseProvider {
  db: SQLiteObject = null;

  constructor(public http: HttpClient) {
  }

  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }

  createTable(){
    return this.db.executeSql(CREATE_TABLE, []);
  }

  getAll(){
    let sql = 'SELECT * FROM '+TABLE_NAME;
    return this.db.executeSql(sql, [])
    .then(response => {
      let clientes = [];
      for (let index = 0; index < response.rows.length; index++) {
        clientes.push( response.rows.item(index) );
      }
      return Promise.resolve( clientes );
    })
    .catch(error => Promise.reject(error));
  }

  getById(id:number){
    let sql = 'SELECT * FROM '+TABLE_NAME+' WHERE id = ?';
    return this.db.executeSql(sql, [id]).then(response => {
      return Promise.resolve( response.rows.item(0) );
    })
    .catch(error => Promise.reject(error));
  }

  insert(cliente: Cliente){
    //el UUID es para tener un identificador unico en ambas base de datos
    var uuid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    var fecha = new Date();
    let sql = 'INSERT INTO '+TABLE_NAME+'(nombre,apellido,contacto,observaciones,uuid,created_at,updated_at) VALUES(?,?,?,?,?,?,?)';
    return this.db.executeSql(sql, [
      cliente.nombre,
      cliente.apellido,
      cliente.contacto,
      cliente.observaciones,
      uuid,
      fecha.toString(),
      fecha.toString(),
    ]);
  }

  update(cliente: Cliente){
    var fecha = new Date();
    let sql = 'UPDATE '+TABLE_NAME+' SET nombre=?, apellido=?, contacto=?, observaciones=?, updated_at=? WHERE id=?';
    return this.db.executeSql(sql, [
      cliente.nombre,
      cliente.apellido,
      cliente.contacto,
      cliente.observaciones,
      fecha.toString(),
      cliente.id,
    ]);
  }

  delete(cliente:Cliente){
    let sql = 'DELETE FROM '+TABLE_NAME+' WHERE id=?';
    return this.db.executeSql(sql, [
      cliente.id,
    ]);
  }

}

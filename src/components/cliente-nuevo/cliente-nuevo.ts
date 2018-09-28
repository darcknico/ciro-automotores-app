import { Cliente } from './../../interfaces/cliente';
import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteDataBaseProvider } from '../../providers/cliente-data-base/cliente-data-base';

/**
 * Generated class for the ClienteNuevoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cliente-nuevo',
  templateUrl: 'cliente-nuevo.html'
})
export class ClienteNuevoComponent implements OnInit {

  clienteForm : FormGroup;
  id:number;
  
  constructor(
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private clienteDataBase: ClienteDataBaseProvider,
    public params: NavParams,
    private toastCtrl: ToastController,
  ) {
    this.clienteForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      contacto: ['', Validators.required],
      apellido: [''],
      observaciones: [''],
    });
  }

  get f(){
    return this.clienteForm.controls;
  }

  ngOnInit() {
    this.id = this.params.get('id_cliente');
    if(this.id==null){
      this.id = 0;
      this.clienteForm = this.formBuilder.group({
        nombre: ['', Validators.required],
        contacto: ['', Validators.required],
        apellido: [''],
        observaciones: [''],
      });
    } else {
      this.clienteDataBase.getById(this.id).then(response=>{
        this.clienteForm = this.formBuilder.group({
          nombre: [response.nombre, Validators.required],
          contacto: [response.contacto, Validators.required],
          apellido: [response.apellido],
          observaciones: [response.observaciones],
        });
      });
    }
  }

  close() {
    this.viewCtrl.dismiss();
  }

  continuar(){
    if(!this.clienteForm.valid){
      return;
    }
    var cliente = <Cliente>{};
    cliente.id = this.id;
    cliente.nombre = this.f.nombre.value;
    cliente.apellido = this.f.apellido.value;
    cliente.contacto = this.f.contacto.value;
    cliente.observaciones = this.f.observaciones.value;
    if(this.id == 0){
      this.clienteDataBase.insert(cliente).then(response => {
        this.viewCtrl.dismiss();
        this.params.get('funcActualizar')();
        this.toastCtrl.create({
          message: "Cliente Agregado",
          duration: 3000,
          position: 'bottom'
        }).present();
      });
    } else {
      this.clienteDataBase.update(cliente).then(response => {
        this.viewCtrl.dismiss();
        this.params.get('funcActualizar')();
        this.toastCtrl.create({
          message: "Cliente Editado",
          duration: 3000,
          position: 'bottom'
        }).present();
      });
    }
    

  }

}

import { Marca } from './../../interfaces/vehiculo-disponible';
import { Component } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the VehiculosFiltrarModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'vehiculos-filtrar-modal',
  templateUrl: 'vehiculos-filtrar-modal.html'
})
export class VehiculosFiltrarModalComponent {

  marcas:Marca[];
  seleccionado = 0;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
  ) {
    this.marcas = params.get('dataMarcas');
    this.seleccionado = params.get('dataMarcaSeleccionada');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  filtrarMarca(id_marca){
    this.params.get('funcFiltrarMarca')(id_marca);
    this.viewCtrl.dismiss();
  }
  
}

import { VehiculoDisponible } from './../../interfaces/vehiculo-disponible';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VehiculoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vehiculo',
  templateUrl: 'vehiculo.html',
})
export class VehiculoPage {

  vehiculo:VehiculoDisponible;

  constructor(
    public navCtrl: NavController, public navParams: NavParams
  ) {
    this.vehiculo=navParams.get("dataVehiculo");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VehiculoPage');
  }

}

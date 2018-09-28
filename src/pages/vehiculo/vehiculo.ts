import { VehiculoVerPopoverComponent } from './../../components/vehiculo-ver-popover/vehiculo-ver-popover';
import { VehiculoDisponible } from './../../interfaces/vehiculo-disponible';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';

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
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
  ) {
    this.vehiculo=navParams.get("dataVehiculo");
  }

  ionViewDidLoad() {
    
  }

  presentPopover(myEvent) {
    var self = this;
    let popover = this.popoverCtrl.create(VehiculoVerPopoverComponent,{
      dataVehiculo:self.vehiculo,
    });
    popover.present({
      ev: myEvent
    });
  }

}

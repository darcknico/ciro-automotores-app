import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VehiculoVerPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'vehiculo-ver-popover',
  templateUrl: 'vehiculo-ver-popover.html'
})
export class VehiculoVerPopoverComponent {


  constructor(
    public viewCtrl: ViewController,
    public params: NavParams,
  ) {
  }

  close() {
    this.viewCtrl.dismiss();
  }
}

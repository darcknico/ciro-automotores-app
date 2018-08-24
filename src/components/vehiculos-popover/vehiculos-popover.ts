import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { VehiculoDisponible } from '../../interfaces/vehiculo-disponible';

/**
 * Generated class for the VehiculosPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'vehiculos-popover',
  templateUrl: 'vehiculos-popover.html'
})
export class VehiculosPopoverComponent {

  vehiculos: Observable<VehiculoDisponible>;
  
  constructor(
    public viewCtrl: ViewController,
    public params: NavParams,
  ) {
  }

  close() {
    this.viewCtrl.dismiss();
  }

  getDisponibles(){
    this.params.get('funcGetDisponibles')();
    this.viewCtrl.dismiss();
  }

  invalidateCache(){
    this.params.get('funcInvalidateCache')();
    this.viewCtrl.dismiss();
  }

}

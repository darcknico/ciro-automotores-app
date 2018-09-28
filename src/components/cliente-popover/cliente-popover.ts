import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ClientePopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cliente-popover',
  templateUrl: 'cliente-popover.html'
})
export class ClientePopoverComponent {

  constructor(
    public viewCtrl: ViewController,
    public params: NavParams,
  ) {
  }

  nuevo(){
    this.params.get('funcNuevo')();
    this.viewCtrl.dismiss();
  }

  sincronizar(){
    this.params.get('funcSincronizar')();
    this.viewCtrl.dismiss();
  }

}

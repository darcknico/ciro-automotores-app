import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { NotificacionProvider } from '../../providers/notificacion/notificacion';
import { Notificacion } from '../../interfaces/notificacion';

/**
 * Generated class for the HomeNotificacionesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'home-notificaciones',
  templateUrl: 'home-notificaciones.html'
})
export class HomeNotificacionesComponent {

  notificaciones:Notificacion[] = [];

  constructor(
    public viewCtrl: ViewController,
    public params: NavParams,
    private notificacionService:NotificacionProvider,
  ) {
    
  }
  ngOnInit() {
    this.notificacionService.get(5).subscribe(data=>{
      this.notificaciones = data;
    });
  }

  close() {
    this.viewCtrl.dismiss();
  }

  openUrl(url:string){
    window.open(url,'_system', 'location=yes');
  }

}

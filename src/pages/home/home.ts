import { Notificacion } from './../../interfaces/notificacion';
import { NotificacionProvider } from './../../providers/notificacion/notificacion';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  notificaciones:Notificacion[] = [];

  constructor(
    public navCtrl: NavController,
    private notificacionService:NotificacionProvider
  ) {
    this.notificacionService.get(5).subscribe(data=>{
      this.notificaciones = data;
    });
  }

}

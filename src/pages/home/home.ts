import { ClienteNuevoComponent } from './../../components/cliente-nuevo/cliente-nuevo';
import { HomeNotificacionesComponent } from './../../components/home-notificaciones/home-notificaciones';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
  ) {
    
  }

  notificaciones():void{
    let modal = this.modalCtrl.create(HomeNotificacionesComponent);
    modal.present();
  }

  cliente_nuevo():void{
    let modal = this.modalCtrl.create(ClienteNuevoComponent);
    modal.present();
  }

}

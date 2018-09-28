import { NetworkServiceProvider } from './../../providers/network-service/network-service';
import { Cliente } from './../../interfaces/cliente';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, PopoverController, ToastController } from 'ionic-angular';
import { ClienteDataBaseProvider } from '../../providers/cliente-data-base/cliente-data-base';
import { ClienteNuevoComponent } from '../../components/cliente-nuevo/cliente-nuevo';
import { ClientePopoverComponent } from '../../components/cliente-popover/cliente-popover';

/**
 * Generated class for the ClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cliente',
  templateUrl: 'cliente.html',
})
export class ClientePage {

  clientes:Cliente[]=[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private clienteDataBase: ClienteDataBaseProvider,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    private toastCtrl: ToastController,
    private networkService: NetworkServiceProvider,
  ) {

  }

  ionViewDidLoad() {
    this.actualizar();
  }

  presentPopover(myEvent) {
    var self = this;
    let popover = this.popoverCtrl.create(ClientePopoverComponent,{
      funcNuevo:function(){
        self.nuevo();
      },
    });
    popover.present({
      ev: myEvent
    });
  }

  nuevo(){
    var self = this;
    let modal = this.modalCtrl.create(ClienteNuevoComponent,{
      funcActualizar:function(){
        self.actualizar();
      },
    });
    modal.present();
  }

  editar(item:Cliente):void{
    var self = this;
    let modal = this.modalCtrl.create(ClienteNuevoComponent,{
      id_cliente : item.id,
      funcActualizar:function(){
        self.actualizar();
      },
    });
    modal.present();
  }

  eliminar(item:Cliente):void{
    let alert = this.alertCtrl.create({
      title: 'Eliminar Cliente',
      message: 'Si esta sincornizado en el servidor. No sera eliminado.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Continuar',
          handler: () => {
            this.clienteDataBase.delete(item).then(response=>{
              this.toastCtrl.create({
                message: "Cliente Eliminado",
                duration: 3000,
                position: 'bottom'
              }).present();
              this.actualizar();
            });
          }
        }
      ]
    });
    alert.present();
    this.clienteDataBase.delete(item);
  }

  actualizar(){
    this.clienteDataBase.getAll().then(data=>{
      this.clientes = data;
    });
  }

  sincronizar(){
    console.log(this.networkService.previousStatus);
  }
}

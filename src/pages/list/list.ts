import { VehiculoPage } from './../vehiculo/vehiculo';
import { VehiculosFiltrarModalComponent } from './../../components/vehiculos-filtrar-modal/vehiculos-filtrar-modal';
import { VehiculosPopoverComponent } from './../../components/vehiculos-popover/vehiculos-popover';
import { VehiculoDisponible, Marca } from './../../interfaces/vehiculo-disponible';
import { VehiculoProvider } from './../../providers/vehiculo/vehiculo';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, PopoverController, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  original: Observable<VehiculoDisponible[]>;
  vehiculos: VehiculoDisponible[];
  searchTerm:string;
  marcas:Marca[]=[];
  marcaSeleccionada;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public vehiculoProvider : VehiculoProvider,
    public loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
    private socialSharing: SocialSharing,
  ) {
    this.marcaSeleccionada = 0;
    this.getDisponibles();
  }

  ver(vehiculo){
    this.navCtrl.push(VehiculoPage,{dataVehiculo:vehiculo});
  }

  presentPopover(myEvent) {
    var self = this;
    let popover = this.popoverCtrl.create(VehiculosPopoverComponent,{
      dataVehiculos:this.vehiculos,
      funcGetDisponibles:function(){
        self.getDisponibles();
      },
      funcInvalidateCache:function(){
        self.invalidateCache();
      },
    });
    popover.present({
      ev: myEvent
    });
  }


  getDisponibles(refresher?){
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Consultando...',
    });
    loading.present();
    this.original = this.vehiculoProvider.disponibles(refresher);
    this.original.subscribe(data => {
      this.vehiculos = data;
      if(refresher){
        this.marcaSeleccionada = 0;
        refresher.complete();
        this.marcas = [];
      }
      if(this.marcas.length==0){
        data.forEach(vehiculo=>{
          var existing = this.marcas.find(function(each) {
            return each.id === vehiculo.id_marca;
          });
          if (existing) {
              existing.cantidad = existing.cantidad + 1;
          } else {
            var obj:Marca=vehiculo.marca;
            obj.cantidad=1;
            this.marcas.push(obj);
          }
        });
      }
      loading.dismiss();
    },
    error => {
      loading.dismiss();
      console.log(error);
    });
  }

  invalidateCache() {
    this.vehiculoProvider.disponibleClear();
  }
 
  forceReload(refresher) {
    this.getDisponibles(refresher);
  }

  buscar(){
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Filtrando...',
    });
    loading.present();
    var key = this.searchTerm.toLowerCase();
    this.original.subscribe(data=>{
      this.vehiculos = data.filter(vehiculo => {
        return vehiculo.modelo.toLowerCase().includes(key) || vehiculo.marca.nombre.toLowerCase().includes(key);
      });
      loading.dismiss();
    });
  }

  filtrarMarca(id_marca:number){
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Filtrando...',
    });
    loading.present();
    this.original.subscribe(data=>{
      this.vehiculos = data.filter(vehiculo => {
        return vehiculo.id_marca == id_marca;
      });
      loading.dismiss();
    });
  }
  filtros(){
    var self = this;
    let modal = this.modalCtrl.create(VehiculosFiltrarModalComponent,{
      dataMarcas:self.marcas,
      dataMarcaSeleccionada:self.marcaSeleccionada,
      funcFiltrarMarca:function(id_marca){
        if(self.marcaSeleccionada == id_marca){
          self.marcaSeleccionada = 0;
          self.getDisponibles();
        } else {
          self.marcaSeleccionada = id_marca;  
          self.filtrarMarca(id_marca);
        }
      },
    });
    modal.present();
  }

  shouldShowCancel(){
    this.getDisponibles();
  }

  compartir(vehiculo:VehiculoDisponible) {
    console.log(vehiculo);
    this.socialSharing.share(
      vehiculo.marca.nombre+" "+vehiculo.modelo+
      " Precio VENTA "+vehiculo.precio_venta+" - Entrega Minima "+vehiculo.calculo_entrega_minima+" - Credito "+vehiculo.calculo_credito, 
      vehiculo.modelo,
      null,
      "https:\\ciroautomotores.com.ar").then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });
  }

}
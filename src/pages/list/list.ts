import { VehiculoPage } from './../vehiculo/vehiculo';
import { VehiculosFiltrarModalComponent } from './../../components/vehiculos-filtrar-modal/vehiculos-filtrar-modal';
import { VehiculosPopoverComponent } from './../../components/vehiculos-popover/vehiculos-popover';
import { VehiculoDisponible, Marca } from './../../interfaces/vehiculo-disponible';
import { VehiculoProvider } from './../../providers/vehiculo/vehiculo';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, PopoverController, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  original: Observable<VehiculoDisponible[]>;
  vehiculos: VehiculoDisponible[];
  searchTerm:string;
  marcas:Marca[]=[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public vehiculoProvider : VehiculoProvider,
    public loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
  ) {
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
      if(refresher){
        refresher.complete();
      }
      this.vehiculos = data;
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
      funcFiltrarMarca:function(id_marca){
        self.filtrarMarca(id_marca);
      },
    });
    modal.present();
  }

  shouldShowCancel(){
    this.getDisponibles();
  }
}
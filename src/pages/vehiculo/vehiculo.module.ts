import { VehiculosFiltrarModalComponent } from './../../components/vehiculos-filtrar-modal/vehiculos-filtrar-modal';
import { VehiculosPopoverComponent } from './../../components/vehiculos-popover/vehiculos-popover';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehiculoPage } from './vehiculo';

@NgModule({
  declarations: [
    VehiculoPage,
  ],
  imports: [
    VehiculosFiltrarModalComponent,
    VehiculosPopoverComponent,
    IonicPageModule.forChild(VehiculoPage),
  ],
})
export class VehiculoPageModule {}

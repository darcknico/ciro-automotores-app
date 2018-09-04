import { NgModule } from '@angular/core';
import { VehiculosPopoverComponent } from './vehiculos-popover/vehiculos-popover';
import { VehiculosFiltrarModalComponent } from './vehiculos-filtrar-modal/vehiculos-filtrar-modal';
import { IonicModule } from 'ionic-angular'
@NgModule({
	declarations: [VehiculosPopoverComponent,
    VehiculosFiltrarModalComponent],
	imports: [IonicModule],
	exports: [VehiculosPopoverComponent,
    VehiculosFiltrarModalComponent]
})
export class ComponentsModule {}

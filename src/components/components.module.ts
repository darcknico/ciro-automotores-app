import { NgModule } from '@angular/core';
import { VehiculosPopoverComponent } from './vehiculos-popover/vehiculos-popover';
import { VehiculosFiltrarModalComponent } from './vehiculos-filtrar-modal/vehiculos-filtrar-modal';
@NgModule({
	declarations: [VehiculosPopoverComponent,
    VehiculosFiltrarModalComponent],
	imports: [],
	exports: [VehiculosPopoverComponent,
    VehiculosFiltrarModalComponent]
})
export class ComponentsModule {}

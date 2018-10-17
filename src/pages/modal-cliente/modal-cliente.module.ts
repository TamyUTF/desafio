import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalClientePage } from './modal-cliente';

@NgModule({
  declarations: [
    ModalClientePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalClientePage),
  ],
})
export class ModalClientePageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdicionaClientePage } from './adicionacliente';

@NgModule({
  declarations: [
    AdicionaClientePage,
  ],
  imports: [
    IonicPageModule.forChild(AdicionaClientePage),
  ],
})
export class AdicionaclientePageModule {}

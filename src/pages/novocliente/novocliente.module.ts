import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovoclientePage } from './novocliente';

@NgModule({
  declarations: [
    NovoclientePage,
  ],
  imports: [
    IonicPageModule.forChild(NovoclientePage),
  ],
})
export class NovoclientePageModule {}

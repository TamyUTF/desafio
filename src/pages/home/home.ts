import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AvaliacaoProvider } from '../../providers/avaliacao/avaliacao';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private avaliacao:Observable<any>

  constructor(public navCtrl: NavController, public avaliacaoService:AvaliacaoProvider) {
    this.avaliacao = this.avaliacaoService.getAll();
  }

}

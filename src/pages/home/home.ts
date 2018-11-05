import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AvaliacaoProvider } from '../../providers/avaliacao/avaliacao';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private avaliacao:Observable<any>
  private arrayResultados:[];
  
 
  constructor(public db:AngularFireDatabase,public navCtrl: NavController, public avaliacaoService:AvaliacaoProvider) {
    this.avaliacao = this.avaliacaoService.getAll();
  }

  /*filtrarResultados(){//apenas como funcionaria a lógica para mostrar os resultados
    this.db.list('resultados/mes').snapshotChanges().map(c=>
      c.map(c=>{
        if((c.nota <=6) && (c.nota >=0)) {//se a nota fora entre 0-6
        this.arrayResultados[0]++;
      }else if((c.nota ==7) || (c.nota == 8)){
        this.arrayResultados[1]++;
      }else if((c.nota ==9) || (c.nota == 10)){
      this.arrayResultados[2]++;
      }
      var nps = (((this.arrayResultados[2]-this.arrayResultados[2])/this.arrayResultados.length())*100);
      
    ))
  }*/

}

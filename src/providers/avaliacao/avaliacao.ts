import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ClienteProvider } from '../../providers/cliente/cliente';
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs';
import {switchMap, map} from 'rxjs/operators';
import 'rxjs/add/operator/map'


@Injectable()
export class AvaliacaoProvider {
  private caminho = "avaliacao/";
  private clientes:Observable<any>;
  

  constructor(public db:AngularFireDatabase, public serviceCliente:ClienteProvider, public alert:AlertController) {
    console.log('Hello AvaliacaoProvider Provider');
    this.clientes = serviceCliente.getAll();
    
  }


  getAll(){
    return this.db.list(this.caminho).snapshotChanges().map(changes=>{
      return changes.map(c=>({
        key:c.payload.key, ...c.payload.val()}));
      })
  }



  get(key: string){
    return this.db.object(this.caminho + key).snapshotChanges()
    .map(c=>{
      return {key:c.key,...c.payload.val()};
    });
  }
  
  mostraAlert(){
    let alert = this.alert.create({
      title: "Ops!",
      subTitle:"Uma avaliação já foi realizada neste mês, selecione outra data, por favor.",
      buttons:["Ok"]
    });
    alert.present();
  }

  salvar(avaliacao){
    return new Promise((resolve,reject)=>{
      this.db.object(this.caminho+avaliacao.data).snapshotChanges().subscribe(result=>{
        if(result.key){//se a data já existir
          this.mostraAlert(); //mostra um alert...//BUG: Após salvar dados, ele aparecerá...
        }else{
          var updateCliente={};
          updateCliente['cliente/'+avaliacao.clientes]={flag: 2}; //flag muda para 2 quando o cliente é selecionado para avaliação
          updateCliente['avaliacao/'+avaliacao.data]={clientes:avaliacao.clientes}
          this.db.object('/').update(updateCliente);
          }
        })
    })
  }

/*atualizaFlag(avaliacao){
    this.cliente = t
    let ref = this.db.object('cliente/' + idCliente);
    ref.snapshotChanges().subscribe(action=>{
      if(action.payload.flag
    })
    this.db.object('cliente/'+idCliente).update({
      flag:
    })
  }*/


  selecionarAvaliados(){
    return this.db.list("avaliados").snapshotChanges().map(changes=>{
        return changes.map(c=>({
          key:c.payload.key, ...c.payload.val()}));
        })
  }

  remover(key:string){
    return this.db.list(this.caminho).remove(key);
  }

}

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
          this.mostraAlert(); //mostra um alert...//BUG: Após salvar dados, ele aparece ò_ó)9
        }else{
          this.decFlag();
          var updateCliente={};
          avaliacao.clientes.forEach(element => {
            updateCliente['cliente/'+ element.key]={
              flag: 2, //flag muda para 2 quando o cliente é selecionado para avaliação(determina a qtd de avaliações restantes para poder realizar outra)
              nome: element.nome,
              resp: element.resp,
              data: avaliacao.data,};
            updateCliente['avaliacao/'+avaliacao.data]={clientes: element.key}//está salvando apenas a última key do cliente selecionado
          });
          //updateCliente['avaliacao/'+avaliacao.data]={clientes: avaliacao.clientes.key} **Deveria salvar todo o array com as keys dos clientes selecionados, mas ocorre um erro
          
          this.db.object('/').update(updateCliente);
          }
        })
    })
  }

  decFlag(){ 
    this.clientes.map(c=>{
      c.map(c=>{if(c.flag.parseInt()>=0){//a cada inserção de avaliação, flag--
        c.flag.parseInt()-1;
        console.log("---passei por aq---");
        this.db.object('cliente/' + c.key).update({
          nome: c.nome,
          resp: c.resp,
          data: c.data,
          flag: c.flag})
      }})
    })
  }


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

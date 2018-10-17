import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ClienteProvider } from '../../providers/cliente/cliente';
import 'rxjs/add/operator/map'


@Injectable()
export class AvaliacaoProvider {
  private caminho = "avaliacao/";
  

  constructor(public db:AngularFireDatabase, public serviceCliente:ClienteProvider) {
    console.log('Hello AvaliacaoProvider Provider');
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

  salvar(avaliacao:any,cliente){//Esta função salvaria a data de avaliação juntamente com o array de clientes selecionados
    return new Promise((resolve,reject)=>{
      this.db.list(this.caminho).push({data:avaliacao.data,
      clientes:[cliente.key],data_cliente:avaliacao.data+"_"+cliente.key})
      .then((result:any)=> resolve(result.key));
    });
  }



  /*salvar(avaliacao: any){
    return new Promise((resolve, reject)=>{
      if (avaliacao.key){
        this.db.list(this.caminho)
        .update(avaliacao.key,{
          data: avaliacao.data,
          cliente: avaliacao.cliente})
        .then(() => resolve())
        .catch((e) => reject(e));
      } else {
        console.log(this.db.list);
        this.db.list(this.caminho)
        .push({data: avaliacao.data, 
          cliente: [avaliacao.cliente])
          data_cliente:[avaliacao.data+"_"+avaliacao.cliente],
          data_tipo:[avaliacao.data+"_"+avaliacao.tipo]})
        .then((result:any) => resolve(result.key));
      }
    });
  }*/

  remover(key:string){
    return this.db.list(this.caminho).remove(key);
  }

}

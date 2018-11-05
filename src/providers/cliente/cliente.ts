import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';


@Injectable()
export class ClienteProvider {
  private caminho = "cliente/";

  constructor(public db: AngularFireDatabase) {
    console.log('Hello ClienteProvider Provider');
  }

  getAll() {
    return this.db.list(this.caminho).snapshotChanges().map(changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }));
    })
  }

  get(key: string) {
    return this.db.object(this.caminho + key).snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      });
  }

  salvar(cliente: any) {
    return new Promise((resolve, reject) => {
      if (cliente.key) {
        this.db.list(this.caminho)
          .update(cliente.key, {
            nome: cliente.nome,
            resp: cliente.resp,
            data: cliente.data,
            flag: cliente.flag
          })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.caminho, ref => ref.orderByChild('nome'))
          .push({
            nome: cliente.nome,
            resp: cliente.resp,
            data: cliente.data,
            flag: 0 //flag determina a quantidade de avaliações restantes para estar apto para avaliação
          })
          .then((result: any) => resolve(result.key));
      }
    });
  }
  
  clientesAptos(){//filtra clientes aptos para avaliação
    return this.db.list(this.caminho, ref=>ref.orderByChild('flag').equalTo(0)).snapshotChanges()
    .map(c => {
      return c.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }));
    });
  }

  

  avaliados(idCliente){
    this.db.list(this.caminho)
  }

  remover(key: string) {
    return this.db.list(this.caminho).remove(key);
  }


}

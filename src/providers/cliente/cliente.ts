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
            data: cliente.data
          })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.caminho, ref => ref.orderByChild('nome'))
          .push({
            nome: cliente.nome,
            resp: cliente.resp,
            data: cliente.data,
            tipo: 'Nenhum'
          })
          .then((result: any) => resolve(result.key));
      }
    });
  }

  avaliacaoCliente(cliente) { //atualiza quando o cliente realizar a avaliação
    return new Promise((resolve, reject) => {
      if (cliente.key) {
        this.db.list(this.caminho).update(cliente.key, {
          tipo: cliente.tipo
        })
          .then(() => resolve())
          .catch((e) => reject(e));
      }
    })

  }

  remover(key: string) {
    return this.db.list(this.caminho).remove(key);
  }


}

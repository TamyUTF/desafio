import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class ClienteProvider {
  private infos = [];
  private clienteUrl = 'cliente/';
  ref = firebase.database().ref('clientes/');

  constructor() {
    console.log('Hello ClienteProvider Provider');
  }

  getAll(){
    return firebase.database().ref(this.clienteUrl).on('child_added',function(snap, key){
      let newPost = snap.val();
    });
  }

  save(cliente){
    if(cliente.key){//se existe um cliente
      firebase.database().ref(this.clienteUrl+cliente.key).update({
        nome: cliente.nome,
        data: cliente.data,
        resp: cliente.resp,
        tipo: cliente.tipo
      })
    }else{
      firebase.database().ref(this.clienteUrl).push({
        nome: cliente.nome,
        data: cliente.data,
        resp: cliente.resp,
        tipo: cliente.tipo
      }).then(resp => console.log(resp));
    }
  }


}

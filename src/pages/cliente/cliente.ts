import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ClienteProvider } from '../../providers/cliente/cliente';
import { ModalClientePage } from '../modal-cliente/modal-cliente';
import { AdicionaClientePage } from '../adicionacliente/adicionacliente';

@IonicPage()
@Component({
  selector: 'page-cliente',
  templateUrl: 'cliente.html',
})
export class ClientePage {
  private clientes: Observable<any>;
  
  constructor(public db: AngularFireDatabase, public service:ClienteProvider, public modal:ModalController) {
      this.clientes = this.service.getAll();
  }

  
  novoCliente(){
    let modalCliente = this.modal.create(AdicionaClientePage);
    modalCliente.present();   
    this.clientes = this.service.getAll();
  }

  mostraCliente(cliente){
    let modalCliente = this.modal.create(ModalClientePage,{
      cliente: cliente});
      modalCliente.present();

  }

  removerCliente(cliente){
    this.service.remover(cliente.key);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientePage');
  }

}

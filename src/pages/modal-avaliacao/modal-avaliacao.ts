import { Component } from '@angular/core';
import { IonicPage, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AvaliacaoProvider } from '../../providers/avaliacao/avaliacao';
import { ClienteProvider } from '../../providers/cliente/cliente';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-modal-avaliacao',
  templateUrl: 'modal-avaliacao.html',
})
export class ModalAvaliacaoPage {
  private tituloPagina: string;
  private formulario: FormGroup;
  private clientes: any;

  constructor(public params: NavParams, public avaliacaoService: AvaliacaoProvider, public clienteService: ClienteProvider,
    public formB: FormBuilder, public toast: ToastController, public view: ViewController) {
    this.clientes = this.clienteService.getAll();
  }

  verificaCliente() {
    this.clientes.map((item) => {
      if (!this.clientes.nome.selecionado) { //Se o cliente não tiver sido selecionado

      }
    })
  }

  mostrarToast(msg) {
    let mensagem = this.toast.create({
      message: msg,
      duration: 3000,
      position: 'top',
      showCloseButton: true
    });
    mensagem.present();
  }

  fechar() {
    this.view.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalAvaliacaoPage');
  }

}

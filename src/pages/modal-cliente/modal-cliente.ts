import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ClienteProvider } from '../../providers/cliente/cliente';
import { Observable } from 'rxjs';


@IonicPage()
@Component({
  selector: 'page-modal-cliente',
  templateUrl: 'modal-cliente.html',
})
export class ModalClientePage {
  private tituloPagina: String;
  private formulario: FormGroup;
  private cliente: any;
  private editando = false;


  constructor(public view: ViewController, public params: NavParams,
    public service: ClienteProvider, public toast: ToastController,
    public formB: FormBuilder) {
    this.cliente = this.params.data.cliente || {};

    if(this.cliente != null)
      this.tituloPagina=this.cliente.nome;
  }

  editaCliente(cliente) {
    if (cliente.key != null) {
      this.tituloPagina = "Editando Cliente";
      this.editando = true;
      this.formulario = this.formB.group({
        key:  [cliente.key],
        nome: [cliente.nome, Validators.required],
        resp: [cliente.resp, Validators.required],
        data: [cliente.data, Validators.required],
        tipo: ['Nenhum']
      })
      console.log(this.formulario.value);
      this.service.salvar(this.formulario.value);
    }

  }

  salvarCliente() {
    this.service.salvar(this.formulario.value).then(() => {
      this.mostrarToast("Cliente foi salvo com sucesso!");
      this.fechar();
    })
      .catch((e) => {
        this.mostrarToast("Erro ao salvar o cliente.");
        console.error(e);
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
    console.log('ionViewDidLoad ModalClientePage');
  }

}

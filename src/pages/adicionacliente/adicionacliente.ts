import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ClienteProvider } from '../../providers/cliente/cliente';

@IonicPage()
@Component({
  selector: 'page-adicionacliente',
  templateUrl: 'adicionacliente.html',
})
export class AdicionaClientePage {
  private formulario: FormGroup;
  private cliente={key:'',nome:'',resp:'',data:''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public view:ViewController, 
              public toast:ToastController,public formB:FormBuilder, public service:ClienteProvider) {
      this.criaFormulario();
  }

  criaFormulario(){
    this.formulario = this.formB.group({
      key:  [this.cliente.key],
      nome: [this.cliente.nome, Validators.required],
      resp: [this.cliente.resp, Validators.required],
      data: [this.cliente.data, Validators.required],  
    })
  }

  salvarCliente(){
    this.service.salvar(this.formulario.value).then(()=>{
      this.mostrarToast("Cliente foi salvo com sucesso!");
      this.fechar();
    })
    .catch((e)=>{
      this.mostrarToast("Erro ao salvar o cliente :(");
      console.log(e);
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
    console.log('ionViewDidLoad AdicionaclientePage');
  }

}

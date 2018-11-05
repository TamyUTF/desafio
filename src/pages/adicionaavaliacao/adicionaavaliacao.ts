import { Component } from '@angular/core';
import { IonicPage, NavParams, ToastController, ViewController } from 'ionic-angular';
import { ClienteProvider } from '../../providers/cliente/cliente';
import { AvaliacaoProvider } from '../../providers/avaliacao/avaliacao';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-adicionaavaliacao',
  templateUrl: 'adicionaavaliacao.html',
})
export class AdicionaAvaliacaoPage {
  private clientes:Observable<any>;
  private avaliados: Observable<any>;
  private avaliacao = {data:'',clientes:{}};

  constructor(public toast: ToastController, public params: NavParams, public avaliacaoService: AvaliacaoProvider,
    public clienteService: ClienteProvider, public view: ViewController) {
      this.clientes = this.clienteService.clientesAptos();
      
  }

  salvaAvaliacao(){
    this.avaliacaoService.salvar(this.avaliacao).then(()=>{
      this.mostrarToast("Cliente foi salvo com sucesso!");
      this.fechar();
    });
  }



  selecionaCliente(){
    const clientes = this.clientes;
    const subs = {next: function(value){

    }}

  }

  /*selecionaAvaliados(){//lista os clientes aptos a realizarem avaliação
    let dataId:[any];
    const avaliados = this.avaliados;
    const subscribe = {next: function(value){
      dataId.push(value.id_data);//pega
      }
    }
    avaliados.subscribe(subscribe);
    avaliados.forEach(next=>{
      let arraySplit = next.split("_");
      for(let i = 0; i < arraySplit.length;i++){

      }
    }) 
  }*/

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
    console.log('ionViewDidLoad AdicionaAvaliacaoPage');
  }

}

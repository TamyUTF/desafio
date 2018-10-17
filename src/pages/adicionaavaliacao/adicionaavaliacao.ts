import { Component } from '@angular/core';
import { IonicPage, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ClienteProvider } from '../../providers/cliente/cliente';
import { AvaliacaoProvider } from '../../providers/avaliacao/avaliacao';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-adicionaavaliacao',
  templateUrl: 'adicionaavaliacao.html',
})
export class AdicionaAvaliacaoPage {
  private formulario: FormGroup;
  private clientes:Observable<any>;
  private clientesAux: [any];
  private avaliacoes: Observable<any>;
  private avaliacoesAux = {key:'', data:'',clientesSelecionados:[]};
  private msg:string;
  private dataAtual: any;

  constructor(public toast: ToastController, public params: NavParams, public avaliacaoService: AvaliacaoProvider,
    public clienteService: ClienteProvider, public view: ViewController,public formB:FormBuilder) {
      this.clientes = this.clienteService.getAll();
      this.avaliacoes = this.avaliacaoService.getAll();
      this.criaFormulario();
       //this.formataData();
      
  }

  criaFormulario(){
    this.formulario = this.formB.group({
      key:  [this.avaliacoesAux.key],
      nome: [this.avaliacoesAux.data, Validators.required],
      resp: [this.avaliacoesAux.clientesSelecionados, Validators.required],
    })
  }

  formataData() {//formata a data atual
    let dataObj = new Date();
    let ano = dataObj.getFullYear.toString();
    let mes = parseInt(dataObj.getMonth.toString());

    this.dataAtual[0] = ano;
    this.dataAtual[1] = mes;
  }

  filtraCliente() { //Esta função selecionaria os clientes aptos para realizar a avaliação**
    this.clientes.map(r => r.map(user => {
      if (user.tipo == 'Nenhum') { //se não realizou nenhuma avalição
        this.clientesAux.push(user.key()); //grava os ids
      } else { //caso tenha feito avalição
        this.avaliacoes.forEach(r => {
          let dataCli = r.data.split("-");
          if ((parseInt(dataCli[0].toString()) + 2) <= parseInt(this.dataAtual[1])) { //verifica carência de 2 meses para a próxima avaliação
            this.clientesAux.push(user.key());
          }
        });
      }
    },
      error => console.log(error)));
  }


  verificaData(avaliacao){ //função para verificar se houve uma avaliação no mês
    this.avaliacoes.map(r => r.map(aval =>{
      if(avaliacao.data == aval.data){
        this.msg = "Uma avaliação já foi realizada neste mês.";
      }else{
        this.filtraCliente();
        this.avaliacaoService.salvar(avaliacao, this.clientesAux);
      }
    }))

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
    console.log('ionViewDidLoad AdicionaAvaliacaoPage');
  }

}

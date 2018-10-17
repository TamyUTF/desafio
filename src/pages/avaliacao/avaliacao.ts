import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AvaliacaoProvider } from '../../providers/avaliacao/avaliacao';
import { ClienteProvider } from '../../providers/cliente/cliente';
import { AdicionaAvaliacaoPage } from '../adicionaavaliacao/adicionaavaliacao';
import { useAnimation } from '@angular/core/src/animation/dsl';

@IonicPage()
@Component({
  selector: 'page-avaliacao',
  templateUrl: 'avaliacao.html',
})
export class AvaliacaoPage {
  private avaliacoes: Observable<any>;

  private listaMeses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'
    , 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];


  constructor(public navCtrl: NavController, public modal: ModalController, public avaliacaoService: AvaliacaoProvider,
    public clienteService: ClienteProvider) {
    this.avaliacoes = this.avaliacaoService.getAll();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvaliacaoPage');
  }
  novaAvaliacao() {
    let modalAvaliacao = this.modal.create(AdicionaAvaliacaoPage);
    modalAvaliacao.present();
  }

  removerAvaliacao(avaliacao) {
    this.avaliacaoService.remover(avaliacao);
  }

}

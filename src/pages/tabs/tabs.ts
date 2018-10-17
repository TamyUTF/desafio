import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ClientePage } from '../cliente/cliente';
import { AvaliacaoPage } from '../avaliacao/avaliacao';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ClientePage;
  tab3Root = AvaliacaoPage;

  constructor() {

  }
}

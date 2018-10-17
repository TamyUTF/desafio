import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ClientePage } from '../pages/cliente/cliente';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { HomePage } from '../pages/home/home';
import { AvaliacaoPage } from '../pages/avaliacao/avaliacao';
import { TabsPage } from '../pages/tabs/tabs';
import { AdicionaClientePage } from '../pages/adicionacliente/adicionacliente';
import { AdicionaAvaliacaoPage } from '../pages/adicionaavaliacao/adicionaavaliacao';


import { ModalAvaliacaoPage } from '../pages/modal-avaliacao/modal-avaliacao';
import { ModalClientePage } from '../pages/modal-cliente/modal-cliente';
import { ClienteProvider } from '../providers/cliente/cliente';
import { AvaliacaoProvider } from '../providers/avaliacao/avaliacao';


@NgModule({
  declarations: [
    MyApp,
    ClientePage,
    AvaliacaoPage,
    HomePage,
    TabsPage,
    ModalClientePage,
    ModalAvaliacaoPage,
    AdicionaClientePage,
    AdicionaAvaliacaoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyA3SRnxWLF6eC_QYD9HvCEb9RrpgWvNzjs",
      authDomain: "desafio-forlogic-e4e86.firebaseapp.com",
      databaseURL: "https://desafio-forlogic-e4e86.firebaseio.com",
      projectId: "desafio-forlogic-e4e86",
      storageBucket: "desafio-forlogic-e4e86.appspot.com",
      messagingSenderId: "1078172270901"
    }),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ClientePage,
    AvaliacaoPage,
    HomePage,
    TabsPage,
    ModalClientePage,
    ModalAvaliacaoPage,
    AdicionaClientePage,
    AdicionaAvaliacaoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ClienteProvider,
    AvaliacaoProvider
  ]
})
export class AppModule {}

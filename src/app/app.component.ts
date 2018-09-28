import { ClientePage } from './../pages/cliente/cliente';
import { NetworkServiceProvider } from './../providers/network-service/network-service';
import { ClienteDataBaseProvider } from './../providers/cliente-data-base/cliente-data-base';
import { Usuario } from './../interfaces/user-options';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { CacheService } from 'ionic-cache';

import { OneSignal } from '@ionic-native/onesignal';
import { SQLite } from '@ionic-native/sqlite';
import { Network } from '@ionic-native/network';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon?: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  //INICIO BASE
  appPages: PageInterface[] = [
    { title: 'Inicio', name: 'HomePage', icon:'home', component: HomePage},
  ];

  //INICIO BASE LOGEADO
  loggedInPages: PageInterface[] = [
    { title: 'Disponibles', name: 'ListPage', icon:'car', component: ListPage},
    { title: 'Mis Clientes', name: 'ClientePage', icon:'people', component: ClientePage},
    { title: 'Salir', name: 'LoginPage', icon:'log-out', component: LoginPage, logsOut: true }
  ];
  
  //INICIO BASE DESLOGADO
  loggedOutPages: PageInterface[] = [
      { title: 'Ingresar', name: 'LoginPage', icon:'log-in', component: LoginPage},
  ];
  
  user:Usuario=null;

  constructor(
    private platform: Platform, 
    private statusBar: StatusBar, 
    private splashScreen: SplashScreen,
    private userService: UserServiceProvider,
    private menu: MenuController,
    private events: Events,
    private cache: CacheService,
    private oneSignal: OneSignal,
    private sqlite: SQLite,
    private clienteDataBase: ClienteDataBaseProvider,
    private networkService: NetworkServiceProvider,
    private network: Network,
  ) {
    this.splashScreen.show();
    this.initializeApp();
    this.listenToLoginEvents();
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // SEGUNDOS MINUTOS HORAS DIAS
      this.cache.setDefaultTTL(60 * 60 * 24 * 3);
      this.cache.setOfflineInvalidate(true);
    
      this.statusBar.styleDefault();
      this.userService.hasLoggedIn().then((hasLoggedIn) => {
        this.splashScreen.hide();
        this.enableMenu(hasLoggedIn);
        if(!hasLoggedIn ){
          this.rootPage = LoginPage;
        }
        else if(hasLoggedIn ) {
          this.userService.getUser().then(data=>{
            this.user = data;
          },error=>{
            console.log(error);
          });
          this.rootPage = HomePage;
        }
      });
      this.initializeOnseSignal();
      this.initializeDataBase();
    });
  }

  openPage(page) {
    let params = {};
    if (page.index) {
      params = { tabIndex: page.index };
    }
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      this.nav.setRoot(page.component, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
        });
    }
    if (page.logsOut === true) {
      this.userService.logout();
    }
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.userService.getUser().then(data=>{
        this.user = data;
      },error=>{
        console.log(error);
      });
      this.enableMenu(true);
      this.suscribir();
    });

    this.events.subscribe('user:logout', () => {
        this.enableMenu(false);
    });
  }
  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  initializeOnseSignal(){
    if (this.platform.is('cordova')) {
      this.oneSignal.startInit('78034361-ab14-4018-a430-6be0744c770a', '63791185516');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      this.oneSignal.getIds()
        .then((ids) =>
        {
          console.log('getIds: ' + JSON.stringify(ids));
        });
      this.suscribir();
      this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
      });
      this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
      });
      this.oneSignal.endInit();
    }
  }

  suscribir():void{
    this.userService.getUser().then((data:Usuario)=>{
      if(data==null){
        this.oneSignal.deleteTags([
          'sector','puesto','id_usuario'
        ]);
      } else {
        this.oneSignal.sendTags({
          sector: 'administracion',
          puesto: data.empleado.puesto.nombre,
          id_usuario: data.id,
        });
      }
      
    },error=>{
      console.log(error);
    });
  }

  initializeDataBase():void{
    if (this.platform.is('cordova')) {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      }).then(db=>{
        this.clienteDataBase.setDatabase(db);
        this.clienteDataBase.createTable();
      });
    }

  }

  initializeNetworkEvents():void{
    
    this.networkService.initializeNetworkEvents();
    this.events.subscribe('network:offline', () => {
        alert('network:offline ==> '+this.network.type);    
    });
    this.events.subscribe('network:online', () => {
        alert('network:online ==> '+this.network.type);        
    });
  }
}

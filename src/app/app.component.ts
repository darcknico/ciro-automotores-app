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

  rootPage: any = HomePage;

  appPages: PageInterface[] = [
    { title: 'Inicio', name: 'HomePage', icon:'home', component: HomePage},
  ];
  loggedInPages: PageInterface[] = [
    { title: 'Disponibles', name: 'ListPage', icon:'car', component: ListPage},
    { title: 'Salir', name: 'LoginPage', icon:'log-out', component: LoginPage, logsOut: true }
  ];
  loggedOutPages: PageInterface[] = [
      { title: 'Ingresar', name: 'LoginPage', icon:'log-in', component: LoginPage},
  ];

  user:Usuario=null;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public userService: UserServiceProvider,
    public menu: MenuController,
    public events: Events,
    public cache: CacheService,
    private oneSignal: OneSignal) {
    this.splashScreen.show();
    this.initializeApp();

    // decide which menu items should be hidden by current login status stored in local storage
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
    
    this.listenToLoginEvents();

    this.initializeOnseSignal();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // 24 HORAS
      this.cache.setDefaultTTL(60 * 60 * 24);
      this.cache.setOfflineInvalidate(true);

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.nav.setRoot(page.component);
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
    // Set the root of the nav with params if it's a tab index
      this.nav.setRoot(page.component, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
        });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
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
      this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
      });
      this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
      });
      this.oneSignal.endInit();
    }
  }
}

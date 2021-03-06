import { VehiculoPage } from './../pages/vehiculo/vehiculo';
import { VehiculosFiltrarModalComponent } from './../components/vehiculos-filtrar-modal/vehiculos-filtrar-modal';
import { VehiculosPopoverComponent } from './../components/vehiculos-popover/vehiculos-popover';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SocialSharing } from '@ionic-native/social-sharing';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { PassportServiceProvider } from '../providers/passport-service/passport-service';
import { GlobalServiceProvider } from '../providers/global-service/global-service';
import { ClienteDataBaseProvider } from './../providers/cliente-data-base/cliente-data-base';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../interceptors/token-interceptor';
import { IonicStorageModule } from '@ionic/storage';
import { CacheModule } from 'ionic-cache';
import { VehiculoProvider } from '../providers/vehiculo/vehiculo';

import { OneSignal } from '@ionic-native/onesignal';
import { NotificacionProvider } from '../providers/notificacion/notificacion';
import { VehiculoVerPopoverComponent } from '../components/vehiculo-ver-popover/vehiculo-ver-popover';
import { HomeNotificacionesComponent } from '../components/home-notificaciones/home-notificaciones';
import { ClientePage } from '../pages/cliente/cliente';
import { DateroPage } from '../pages/datero/datero';
import { ClienteNuevoComponent } from '../components/cliente-nuevo/cliente-nuevo';
import { BaseDatosLocalProvider } from '../providers/base-datos-local/base-datos-local';
import { SQLite } from '@ionic-native/sqlite';
import { NetworkServiceProvider } from '../providers/network-service/network-service';
import { Network } from '@ionic-native/network';
import { ClientePopoverComponent } from '../components/cliente-popover/cliente-popover';
import { ClienteServiceProvider } from '../providers/cliente-service/cliente-service';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    VehiculosPopoverComponent,
    VehiculosFiltrarModalComponent,
    VehiculoVerPopoverComponent,
    VehiculoPage,
    ClientePage,
    ClienteNuevoComponent,
    ClientePopoverComponent,
    DateroPage,
    HomeNotificacionesComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    HttpClientModule,
    CacheModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    VehiculosPopoverComponent,
    VehiculosFiltrarModalComponent,
    VehiculoVerPopoverComponent,
    VehiculoPage,
    ClientePage,
    ClienteNuevoComponent,
    ClientePopoverComponent,
    DateroPage,
    HomeNotificacionesComponent,
  ],
  providers: [
    Network,
    StatusBar,
    SplashScreen,
    OneSignal,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PassportServiceProvider,
    GlobalServiceProvider,
    UserServiceProvider,
    VehiculoProvider,
    SocialSharing,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    NotificacionProvider,
    BaseDatosLocalProvider,
    ClienteDataBaseProvider,
    NetworkServiceProvider,
    ClienteServiceProvider,
  ]
})
export class AppModule {}

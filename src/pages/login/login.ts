import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	loginForm:FormGroup;

	passwordType: string = 'password';
  	passwordIcon: string = 'eye-off';

	constructor(
		public userService: UserServiceProvider,
		public navCtrl: NavController,
		public events: Events,
		public navParams: NavParams,
		private alertCtrl: AlertController,
		private loadingCtrl: LoadingController,
		private formBuilder: FormBuilder) {
		this.loginForm = this.formBuilder.group({
			email : ['', Validators.required],
			password : ['', Validators.required],
		});
	}

	onLogin() {
		if(!this.loginForm.valid){
			return false;
		}
		var login = {
			email : this.loginForm.controls.email.value,
			password : this.loginForm.controls.password.value,
		}
		let loading = this.loadingCtrl.create({});
		loading.present();
		this.userService.login(login).subscribe(data => {
				this.events.publish('user:login');
				this.navCtrl.setRoot(HomePage);
				loading.dismiss();
			},
			error => {
				loading.dismiss();
				this.showError(error);
		});
			
	}
	
	showError(error) {
		console.log(error);
		let alert = this.alertCtrl.create({
			title: 'Error',
			// message: error.json().message,
			message: error,
			buttons: ['OK']
		});
		alert.present();
	}

	hideShowPassword() {
		this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
		this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
	}

}

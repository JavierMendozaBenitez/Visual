import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
// import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form!: FormGroup;

  constructor(private router: Router,
    private toastController: ToastController,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }
  // ionViewDidEnter() {
  //   SplashScreen.hide();
  // }

  ionViewWillEnter() {
    // Restablecer el estado de los elementos aquí
    this.resetElements();
  }

  resetElements() {
    // Restablecer el elemento Administrador (ion-checkbox)
    const btnMal = document.getElementById('btnMal') as HTMLIonCheckboxElement;
    if (btnMal) {
      btnMal.checked = false;
    }

    // Restablecer el elemento Usuario (ion-taggle)
    const btnUsuario = document.getElementById('btnUsuario') as HTMLIonToggleElement;
    if (btnUsuario) {
      btnUsuario.checked = false;
    }
  }


  login(ev: any) {
    if (ev) {
      this.router.navigate(['home']);
    } else {
      this.toastController.create({
        message: 'Usuario o contraseña incorrectos',
        duration: 3000,
        position: 'top',
        color: 'danger'
      }).then(toast => toast.present());
    }
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth/auth.service';
// import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Output() onSubmit = new EventEmitter();
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

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


  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private loadingCtrl: LoadingController
  ) { }

  async submit() {
    const loadingElement = await this.loadingCtrl.create({
      message: 'Iniciando sesión...',
    });
    if (this.form.valid) {
      await loadingElement.present();
      const result = await this.auth.login(
        this.email.value,
        this.password.value
      );
      await loadingElement.dismiss();
      this.onSubmit.emit(result);
      this.form.reset();
    }
  }

  fill(index: number = 0) {
    this.email.setValue(TEST_USERS[index].email);
    this.password.setValue(TEST_USERS[index].password);
  }
}

const TEST_USERS = [
  {
    email: 'admin@admin.com',
    password: '111111'
  },
  {
    email: 'invitado@invitado.com',
    password: '222222'

  },
  {
    email: 'usuario@usuario.com',
    password: '333333'
  }
]

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';
import { PhotoService } from '../services/photo/photo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  logoutButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      // cssClass: ['ion-color-danger'],
    },
    {
      text: 'Aceptar',
      role: 'confirm',
      // cssClass: ['ion-color-success'],
      handler: () => this.logout()
    }
  ]

  constructor(
    private auth: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private photoService: PhotoService //calling this service so the galleries can load on login
  ) { }

  async logout() {
    const loadingElement = await this.loadingController
      .create({ message: 'Cerrando sesión...' });

    await loadingElement.present();
    const result = await this.auth.logout();
    await loadingElement.dismiss();

    if (result) {
      this.router.navigate(['login']);
    }
  }
}

import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showBlackScreen: boolean = false;

  constructor(private platform: Platform, private router: Router) {
    this.initializeApp();
  }

  initializeApp() {
    // this.platform.ready().then(() => { });
    // this.platform.ready().then(() => {
    //   SplashScreen.hide();
    // });

    setTimeout(() => {
      this.platform.ready().then(() => {
        this.router.navigateByUrl('/login');
      });
    }, 5000);
  }

  // async initializeApp() {
  //   // Ocultar la pantalla negra después de un tiempo (por ejemplo, 1 segundo)
  //   await SplashScreen.hide();
  //   this.showBlackScreen = true;
  //   setTimeout(() => {
  //     this.showBlackScreen = false;
  //   }, 1000);
  // }
}



// import { Component, OnInit } from '@angular/core';
// import { SplashScreen } from '@capacitor/splash-screen';
// import { Platform } from '@ionic/angular';

// @Component({
//   selector: 'app-root',
//   templateUrl: 'app.component.html',
//   styleUrls: ['app.component.scss'],
// })
// export class AppComponent implements OnInit {

//   constructor(private platform: Platform) {}

//   ngOnInit(): void {
//     this.platform.ready().then(() => {
//       SplashScreen.hide();
//     });
//   }
// }

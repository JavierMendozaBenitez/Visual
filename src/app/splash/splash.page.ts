import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(private router: Router) { }

  showSplashScreen: boolean = true;
  public splashScreenImage: string = '../../assets/icon.png'; // Ruta de la imagen de splash screen

  ngOnInit() {
    // Configurar el tiempo de visualización de la pantalla de presentación (por ejemplo, 3 segundos)
    setTimeout(() => {
      this.showSplashScreen = false;
      console.log("HOLAAAAAAAAAA");
      // this.router.navigateByUrl('/tab1');
      //this.router.navigateByUrl('/login');//anda
    }, 7000); // 3000 milisegundos = 3 segundos
  }

}

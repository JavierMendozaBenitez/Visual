import { Component } from '@angular/core';
import { PhotoService, UserPhoto } from "../../services/photo/photo.service";
import { VoteService } from "../../services/vote/vote.service";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss'],
})
export class GaleriaComponent {

  // photos = this.photoService.uglyPhotos;
  photos: UserPhoto[] = this.photoService.uglyPhotos;
  selectedIndex: number | undefined;
  showToast = false;

  ngOnInit() {
    this.loadPhotos();
  }

  async loadPhotos() {
    // Cargar fotos del servicio
    this.photos = await this.photoService.uglyPhotos;

    // Ordenar las fotos por fecha de forma descendente
    this.photos.sort((a, b) => b.timestamp - a.timestamp);
  }
  // toastButtons = [
  //   {
  //     text: 'Cancelar',
  //     role: 'cancel',
  //     handler: () => this.selectedIndex = undefined
  //   },
  //   {
  //     text: 'Votar',
  //     handler: async () => {
  //       await this.voteService.emitVote(this.photos[this.selectedIndex!].name, 'feas');
  //       this.selectedIndex = undefined;
  //     }
  //   }
  // ];

  alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => this.cancel()
    },
    {
      text: 'Votar',
      handler: () => this.vote()
    }
  ];

  constructor(
    private router: Router,
    private photoService: PhotoService,
    private voteService: VoteService,
    private auth: AuthService,
  ) { }

  takePhoto() {
    this.photoService.addUglyPhoto();
  }

  selectIndex(index: number) {
    this.selectedIndex = index;
    this.showToast = true;
  }

  // vote(index: number) {
  //   this.selectedIndex = index;
  //   this.toastButtons[1].handler();
  // }

  async vote() {
    if (this.selectedIndex !== undefined) {
      await this.voteService.emitVote(this.photos[this.selectedIndex].name, 'feas');
      this.selectedIndex = undefined;
      this.showToast = false;
    }
  }

  cancel() {
    this.selectedIndex = undefined;
    this.showToast = false;
  }

  back() {
    this.selectedIndex = undefined;
    this.router.navigate(['/home']);
  }

  // getEmailFromPhotoName(photoName: string): string {
  //   return photoName.split(' ')[0];
  // }

  getFormattedDate(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }
}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
// import { SplashScreenComponent } from './splash-screen/splash-screen.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./splash/splash.module').then(m => m.SplashPageModule) },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo(['login']) }
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: () => redirectLoggedInTo(['home']) }
  },
  {
    path: 'cosas-lindas',
    loadChildren: () => import('./cosas-lindas/cosas-lindas.module').then( m => m.CosasLindasPageModule)
  },
  {
    path: 'cosas-feas',
    loadChildren: () => import('./cosas-feas/cosas-feas.module').then( m => m.CosasFeasPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

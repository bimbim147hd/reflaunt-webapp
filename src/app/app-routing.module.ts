import { MainComponent } from './components/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NotificationComponent } from './components/notification/notification.component';

const appRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'wardrobe',
        pathMatch: 'full'
      },
      {
        path: 'wardrobe',
        loadChildren: './components/wardrobe/wardrobe.module#WardrobeModule'
      },
      {
        path: 'notification',
        component: NotificationComponent
      },
      {
        path: 'wallet',
        loadChildren: './components/wallet/wallet.module#WalletModule'
      }
    ],
    canActivate: [AuthGuardService]
  },
  {
    path: 'auth',
    loadChildren: './components/auth/auth.module#AuthModule'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      enableTracing: false,
      useHash: false,
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

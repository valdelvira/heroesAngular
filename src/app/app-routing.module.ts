import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [ // uso de carga perezosa
  {
    path: 'auth',
    //cargo el modulo hijo, resolviendo la promesa con el modulo
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    //component: ErrorPageComponent
    redirectTo: '404'
  }
]

@NgModule({
  imports: [
    //las rutas principales
    RouterModule.forRoot(routes)

  ],
  exports: [
    //tiene que ser accesible desde app
    RouterModule
  ]
})
export class AppRoutingModule { }

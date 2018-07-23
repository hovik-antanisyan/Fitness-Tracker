import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth/auth.guard';

const APP_ROUTES: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'training', loadChildren: './training/training.module#TrainingModule', canLoad: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}

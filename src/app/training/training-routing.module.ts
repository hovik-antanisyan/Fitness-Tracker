import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingComponent } from './training.component';

const TRAINING_ROUTES: Routes = [
  {path: '', component: TrainingComponent},
];

@NgModule({
  imports: [RouterModule.forChild(TRAINING_ROUTES)],
  exports: [RouterModule]
})
export class TrainingRoutingModule {}

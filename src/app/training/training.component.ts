import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from './training.service';
import { Exercise } from './exercise.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining: boolean;
  exerciseStartSubscription: Subscription;

  constructor(private training: TrainingService) {
  }

  ngOnInit() {
    this.training.exerciseStarted
      .subscribe((exercise: Exercise) => {
        this.ongoingTraining = exercise !== null;
      });
  }

  ngOnDestroy() {
    if (this.exerciseStartSubscription) {
      this.exerciseStartSubscription.unsubscribe();
    }
  }

}

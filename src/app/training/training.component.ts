import { Component, OnInit } from '@angular/core';
import { TrainingService } from './training.service';
import { Exercise } from './exercise.model';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  ongoingTraining: boolean;

  constructor(private training: TrainingService) { }

  ngOnInit() {
    this.training.exerciseStarted
      .subscribe((exercise: Exercise) => {
          this.ongoingTraining = exercise !== null;
      });
  }

}

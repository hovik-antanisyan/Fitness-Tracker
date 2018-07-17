import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises: any;

  constructor(private trainingService: TrainingService, private db: AngularFirestore) {
  }

  ngOnInit() {
    this.trainingService.fetchAvailableExercises();
    this.trainingService.exercisesChanged
      .subscribe((exercises: Exercise[]) => {
        this.exercises = exercises;
      });
  }

  onStart(id: string) {
    this.trainingService.startExercise(id);
  }

}

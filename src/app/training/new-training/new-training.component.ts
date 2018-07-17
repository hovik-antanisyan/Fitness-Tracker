import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<any>;

    constructor(private trainingService: TrainingService, private db: AngularFirestore) { }

    ngOnInit() {
        this.exercises$ = this.db
            .collection('availableExercises')
            .valueChanges();
    }

  onStart(id: string) {
    this.trainingService.startExercise(id);
  }

}

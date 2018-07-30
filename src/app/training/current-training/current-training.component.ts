import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from '../stop-training.component';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import Timer = NodeJS.Timer;

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  progressInterval: Timer;
  exercise: Exercise;

  constructor(private dialog: MatDialog, private trainingService: TrainingService, private store: Store<fromTraining.State>) {
  }

  ngOnInit() {
    this.store.select(fromTraining.getRunningExercise)
      .subscribe((ex: Exercise) => {
        this.exercise = ex;
        const step = this.exercise.duration / 100 * 1000;
        this.progressInterval = setInterval(() => {
          this.progress += 1;
          if (this.progress >= 100) {
            this.trainingService.completeExercise();
            clearInterval(this.progressInterval);
          }
        }, step);
      });
  }

  onStopProgress() {
    const dialogRef = this.dialog.open(StopTrainingComponent,
      {
        data: {
          progress: this.progress
        }
      });

    dialogRef.afterClosed().subscribe((closed: boolean) => {
      if (closed) {
        clearInterval(this.progressInterval);
        this.trainingService.cancelExercise(this.progress);
      }
    });
  }
}

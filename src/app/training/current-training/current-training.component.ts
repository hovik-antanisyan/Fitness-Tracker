import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from '../stop-training.component';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  progressInterval: number;
  exercise: Exercise;
  @Output() stopTraining = new EventEmitter<void>();

  constructor(private dialog: MatDialog, private trainingService: TrainingService) {
  }

  ngOnInit() {
    this.exercise = this.trainingService.getActiveExercise();
    const step = this.exercise.duration / 100 * 1000;
    console.log(this.exercise);
    this.progressInterval = setInterval(() => {
      this.progress += 1;
      if (this.progress >= 100) {
        clearInterval(this.progressInterval);
      }
    }, step);
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
        this.stopTraining.emit();
      }
    });
  }
}

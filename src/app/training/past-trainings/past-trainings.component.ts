import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  finishedSubscription: Subscription;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService) {
  }

  ngOnInit() {
    this.trainingService.fetchFinishedExercises();
      this.finishedSubscription = this.trainingService.finishedExerciseStarted
      .subscribe((exercises: Exercise[]) => {
        this.dataSource.data = exercises;
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onFilter(e) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  ngOnDestroy() {
    if (this.finishedSubscription) {
      this.finishedSubscription.unsubscribe();
    }
  }

}

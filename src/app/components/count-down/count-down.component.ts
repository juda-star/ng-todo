import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss'],
})
export class CountDownComponent implements OnInit, OnDestroy {
  constructor() {}

  @Input() set dDay(dDay: Date) {
    this._dDay = dDay;
    this.dateNow = new Date();
  }

  private subscription: Subscription = new Subscription();
  private _dDay: Date;

  private dateNow: Date = new Date();

  private milliSecondsInSecond: number = 1000;
  private secondsInMinute: number = 60;
  private minuteInHour: number = 60;
  private hourInDay: number = 24;

  public timeDiff: number;
  public days: number;
  public hours: number;
  public minutes: number;
  public seconds: number;

  ngOnInit(): void {
    this.subscription.add(
      interval(1000).subscribe(() => {
        this.getTimeDiff();
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getTimeDiff(): void {
    this.timeDiff = new Date(this._dDay).getTime() - new Date().getTime();
    this.getTimeUnits(this.timeDiff);
  }

  private getTimeUnits(timeDiff: number): void {
    this.seconds = Math.floor(
      (timeDiff / this.milliSecondsInSecond) % this.secondsInMinute
    );
    this.minutes = Math.floor(
      (timeDiff / (this.milliSecondsInSecond * this.minuteInHour)) %
        this.minuteInHour
    );
    this.hours = Math.floor(
      (timeDiff /
        (this.milliSecondsInSecond *
          this.minuteInHour *
          this.secondsInMinute)) %
        this.hourInDay
    );
    this.days = Math.floor(
      timeDiff /
        (this.milliSecondsInSecond *
          this.minuteInHour *
          this.secondsInMinute *
          this.hourInDay)
    );
  }
}

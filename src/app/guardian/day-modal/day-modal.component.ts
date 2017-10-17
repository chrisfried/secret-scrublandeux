import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-day-modal',
  templateUrl: './day-modal.component.html',
  styleUrls: ['./day-modal.component.scss']
})
export class DayModalComponent implements OnInit {
  public Math;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.Math = Math;
  }

  ngOnInit() {
    console.log(this.data);
  }

  getOffset(activity) {
    const activityStart = new Date(activity.period);
    const dayStart = new Date(this.data.date + 'T00:00:00');
    const diffMs = (activityStart.getTime() - dayStart.getTime());
    const offset = Math.floor(diffMs / 1000 / 60);
    return offset;
  }

}

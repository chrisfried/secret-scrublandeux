import { Component, Inject, OnInit } from '@angular/core'
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog'
import { scrubland } from '../../scrubland.typings'

@Component({
  selector: 'app-day-modal',
  templateUrl: './day-modal.component.html',
  styleUrls: ['./day-modal.component.scss'],
})
export class DayModalComponent implements OnInit {
  Math: Math
  dayStart: Date
  allHours: {
    id: number
    display: string
    start: number
    stop: number
  }[] = []
  gameHours: {
    [key: number]: {
      id: number
      display: string
      start: number
      stop: number
      offset?: number
    }
  } = {}
  gameHourKeys: string[] = []
  modalHeight: number

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      date: Date
      activities: scrubland.Activity[]
    }
  ) {
    this.Math = Math
  }

  ngOnInit() {
    this.dayStart = new Date(this.data.date + 'T00:00:00')
    const dateLoop = new Date(this.dayStart.getTime())
    for (let id = 0; id < 24; id++) {
      const start = dateLoop.getTime()
      const display = dateLoop.toLocaleTimeString(undefined, {
        hour: 'numeric',
      })
      dateLoop.setHours(id + 1)
      const stop = dateLoop.getTime()
      this.allHours.push({
        id,
        display,
        start,
        stop,
      })
    }
    for (const activity of this.data.activities) {
      for (const hour of this.allHours) {
        if (activity.startDate.getTime() < hour.stop && activity.endDate.getTime() >= hour.start) {
          this.gameHours[hour.id] = hour
        }
      }
    }
    let offset = 0
    let prevHour: number
    for (const hour of Object.keys(this.gameHours)) {
      if (prevHour && this.gameHours[hour].id - prevHour > 1) {
        offset += 10
      }
      this.gameHours[hour].offset = offset
      offset += 60
      prevHour = this.gameHours[hour].id
      this.modalHeight = offset
    }
    this.gameHourKeys = Object.keys(this.gameHours)
    for (const activity of this.data.activities) {
      activity.offset = this.gameHours[activity.startDate.getHours()].offset + activity.startDate.getMinutes()
    }
  }
}

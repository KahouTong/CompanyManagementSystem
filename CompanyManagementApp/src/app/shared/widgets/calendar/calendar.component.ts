import { Component, OnInit } from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-widget-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  constructor() { }

  ngOnInit() {

    
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

}

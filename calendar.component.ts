import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  currentMonth: number;
  currentYear: number;
  daysInMonth: { date: number | null; day: number }[] = [];
  weekdays: string[] = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']; // German day names
  monthNames: string[] = [
    'Januar',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember',
  ];
  firstDayOfMonth: number = 0;

  constructor() {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
  }

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar() {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const lastDate = new Date(
      this.currentYear,
      this.currentMonth + 1,
      0
    ).getDate();

    // Store the first day
    this.firstDayOfMonth = firstDay;

    // Clear previous month's days
    this.daysInMonth = [];

    // Add leading empty days (before the first day of the month)
    for (let i = 0; i < firstDay; i++) {
      this.daysInMonth.push({ date: null, day: i });
    }

    // Add actual days in the month
    for (let day = 1; day <= lastDate; day++) {
      const dayOfWeek = (firstDay + day - 1) % 7; // Calculate day of the week
      this.daysInMonth.push({ date: day, day: dayOfWeek });
    }
  }

  previousMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }
}

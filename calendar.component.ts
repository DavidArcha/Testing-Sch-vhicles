import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  currentMonth: number;
  currentYear: number;
  daysInMonth: any[] = [];

  // Car data (you can fetch this from a service in a real application)
  cars = [
    {
      carModel: 'BMW X5',
      bookings: [
        { bookedStartDate: '2024-10-01', bookingEndDate: '2024-10-05' },
        { bookedStartDate: '2024-11-01', bookingEndDate: '2024-11-15' },
      ],
      imageUrl: 'https://www.w3schools.com/images/w3schools_green.jpg',
    },
    {
      carModel: 'MG Hector',
      bookings: [
        { bookedStartDate: '2025-01-01', bookingEndDate: '2025-01-05' },
        { bookedStartDate: '2025-03-01', bookingEndDate: '2025-11-15' },
      ],
      imageUrl: 'https://www.w3schools.com/images/w3schools_green.jpg',
    },
  ];

  dayNames: string[] = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']; // German day names
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

  constructor() {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
  }

  ngOnInit() {
    this.generateDaysInMonth();
  }

  // Generates the days in the current month
  generateDaysInMonth() {
    const daysInMonth = new Date(
      this.currentYear,
      this.currentMonth + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(
      this.currentYear,
      this.currentMonth,
      1
    ).getDay();
    this.daysInMonth = [];

    // Loop through the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayOfWeek = new Date(
        this.currentYear,
        this.currentMonth,
        i
      ).getDay();
      this.daysInMonth.push({
        date: i,
        day: dayOfWeek,
      });
    }
  }

  // Navigate to the next month
  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateDaysInMonth();
  }

  // Navigate to the previous month
  previousMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateDaysInMonth();
  }

  // Check if the car is unavailable for the given date
  isUnavailable(car: any, date: number): boolean {
    for (let booking of car.bookings) {
      // Normalize the dates to remove time component
      const startDate = new Date(booking.bookedStartDate);
      startDate.setHours(0, 0, 0, 0); // Reset time to 00:00:00

      const endDate = new Date(booking.bookingEndDate);
      endDate.setHours(23, 59, 59, 999); // Set time to the end of the day

      const current = new Date(this.currentYear, this.currentMonth, date);
      current.setHours(0, 0, 0, 0); // Reset time to 00:00:00

      if (current >= startDate && current <= endDate) {
        return true;
      }
    }
    return false;
  }

  selectedImage: string | null = null;

  showImage(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }

  closeImage(): void {
    this.selectedImage = null;
  }

  // Method to log the car model when the edit button is clicked
  logCarModel(carModel: string): void {
    console.log(`Car Model: ${carModel}`);
  }

  // Get the number of days in the current month
  getDaysInMonth(month: number, year: number): number {
    return new Date(year, month + 1, 0).getDate();
  }
  // Method to dynamically calculate day width based on number of days
  getDynamicDayWidth(): string {
    const daysInMonth = this.getDaysInMonth(
      this.currentMonth,
      this.currentYear
    );

    // Example: if there are 31 days, make the width smaller, and increase it for months with fewer days
    if (daysInMonth === 28) {
      return 'calc(100% / 28)';
    } else if (daysInMonth === 29) {
      return 'calc(100% / 29)';
    } else if (daysInMonth === 30) {
      return 'calc(100% / 30)';
    } else {
      return 'calc(100% / 31)';
    }
  }
}

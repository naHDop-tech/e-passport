import { Injectable } from '@nestjs/common';

@Injectable()
export class DateCalculatorService {
  getAgeFromBirthDate(birthDate: string): number {
    if (new Date(birthDate) > new Date()) {
      throw new Error('Invalid date');
    }

    const diffs = Date.now() - new Date(birthDate).getTime();
    const ageDate = new Date(diffs);

    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  
  getDateInFuture(date: Date, years = 10): Date {
    date.setFullYear(date.getFullYear() + years);
    return date;
  }

  static getAgeFromDate(date: string): number {
    return DateCalculatorService.getAgeFromDate(date);
  }
}

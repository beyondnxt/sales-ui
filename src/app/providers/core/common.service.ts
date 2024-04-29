import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private snackBar: MatSnackBar) { }

  calculatePaginationVal(): any {
    const height = window.innerHeight;
    if (height <= 500) {
      return 4;
    }
    if (height <= 600) {
      return 4;
    }
    if (height <= 609) {
      return 9;
    }
    if (height <= 657) {
      return 10;
    }
    /* 80% */
    if (height <= 730) {
      return 10;
    }
    /* 80% */
    if (height <= 821) {
      return 11;
    }
    /* 75% */
    if (height <= 900) {
      return 11;
    }
    /* 67% */
    if (height <= 970) {
      return 11;
    }
    /* 67% */
    if (height <= 1020) {
      return 11;
    }
    /* 67% */
    if (height <= 1100) {
      return 11;
    }
    /* 67% */
    if (height <= 1170) {
      return 11;
    }
    /* 67% */
    if (height <= 1210) {
      return 14;
    }
    /* 67% */
    if (height <= 1250) {
      return 14;
    }
    /* 67% */
    if (height <= 1350) {
      return 14;
    }
    /* 50% */
    if (height <= 1400) {
      return 14;
    }
    /* 50% */
    if (height <= 1450) {
      return 15;
    }
    if (height <= 1550) {
      return 15;
    }
    /* 50% */
    if (height <= 1600) {
      return 15;
    }
    /* 50% */
    if (height <= 1700) {
      return 16;
    }
    /* 50% */
    if (height <= 1750) {
      return 16;
    }
    /* 33.3% */
    if (height <= 1800) {
      return 17;
    }
    /* 25% */
    if (height <= 2628) {
      return 17;
    }
  }

  showSnackbar(content: string) {
    this.snackBar.open(content, 'Close', {
      duration: 1000,
    });
  }

  dateFormat(date: any) {
    if (date != null) {
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    }
    else {
      return date;
    }
  }


}

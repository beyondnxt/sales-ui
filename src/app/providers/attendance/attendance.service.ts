import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(public http:HttpClient) { }

  getTodayAttendance(date: any, query: any, searchQry: any): Observable<any> {
    return this.http.get(environment.BASE_URL + `/attendance?date=${date}&${query}${searchQry}`);
  }
  deleteAttendance(id:string): Observable<any> {
    return this.http.delete(environment.BASE_URL + `/attendance/${id}`);
  }
}
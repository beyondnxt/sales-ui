import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApproveService {

  constructor(public http:HttpClient) { }

  getAllPendingApprovalList(searchQry: any, page: any, sort: any): Observable<any> {
    return this.http.get(environment.BASE_URL + `/attendance?isNotify=true${page}${searchQry}&${sort}`);
  }

  approveAttendance(ids:string): Observable<any> {
    return this.http.put(environment.BASE_URL + `/attendance/updateMultipleApproval`,ids);
  }

  rejectAttendance(ids:string): Observable<any> {
    return this.http.put(environment.BASE_URL + `/attendance/updateMultipleReject`,ids);
  }
}

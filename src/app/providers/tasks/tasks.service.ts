import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(public http:HttpClient) { }

  getTaskList(tab: any, query: any, serachQry: any, cusQry: any, cbQry: any, atQry: any, ttQry: any, date:any): Observable<any> {
    return this.http.get(environment.BASE_URL + `/task?startDate=${date}&${tab}&${query}${serachQry}${cusQry}${cbQry}${atQry}${ttQry}`);
  }
  postTask(payload: any): Observable<any> {
    return this.http.post(environment.BASE_URL + '/task', payload);
  }
  deleteTask(id:string): Observable<any> {
    return this.http.delete(environment.BASE_URL + `/task/${id}`);
  }
  updateTask(id:string,payload:any): Observable<any> {
    return this.http.put(environment.BASE_URL + `/task/${id}`,payload);
  }
  verifyTask(ids:string): Observable<any> {
    return this.http.put(environment.BASE_URL + `/task/status`,ids);
  }
  saveFeedBack(id:string,payload:any): Observable<any> {
    return this.http.put(environment.BASE_URL + `/task/${id}`,payload);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(public http:HttpClient) { }

  getTaskList(tab: any): Observable<any> {
    return this.http.get(environment.BASE_URL + `/task?${tab}`);
  }
  postTask(payload: any): Observable<any> {
    return this.http.post(environment.BASE_URL + '/task', payload);
  }
  deleteTask(id:string): Observable<any> {
    return this.http.delete(environment.BASE_URL + `/task/${id}`);
  }
}

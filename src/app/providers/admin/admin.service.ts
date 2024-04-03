import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public http: HttpClient) { }

  postRegiter(payload: any): Observable<any> {
    return this.http.post(environment.BASE_URL + '/auth/signup', payload);
  }
  getUsers(query:string): Observable<any> {
    return this.http.get(environment.BASE_URL + `/user?page=1&limit=10`);
  }
  deleteUser(id:string): Observable<any> {
    return this.http.delete(environment.BASE_URL + `/user/${id}`);
  }
  updateUser(id:string,payload:any): Observable<any> {
    return this.http.put(environment.BASE_URL + `/user/${id}`,payload);
  }
}

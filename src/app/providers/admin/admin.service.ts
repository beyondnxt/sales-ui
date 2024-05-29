import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(public http: HttpClient) {}

  login(payload: any): Observable<any> {
    return this.http.post(environment.BASE_URL + '/auth/signin', payload);
  }
  postRegiter(payload: any): Observable<any> {
    return this.http.post(environment.BASE_URL + '/auth/signup', payload);
  }
  getUsers(query: string, searchQry: any): Observable<any> {
    return this.http.get(environment.BASE_URL + `/user?${query}${searchQry}`);
  }
  getAllUsers(): Observable<any> {
    return this.http.get(environment.BASE_URL + `/user/all`);
  }
  deleteUser(id: string): Observable<any> {
    return this.http.delete(environment.BASE_URL + `/user/${id}`);
  }
  updateUser(id: string, payload: any): Observable<any> {
    return this.http.put(environment.BASE_URL + `/user/${id}`, payload);
  }
}

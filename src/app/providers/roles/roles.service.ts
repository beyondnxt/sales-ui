import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(public http:HttpClient) { }

  getRole(): Observable<any> {
    return this.http.get(environment.BASE_URL + `/role`);
  }
  postRoleData(payload: any): Observable<any> {
    return this.http.post(environment.BASE_URL + '/role', payload);
  }
  deleteRole(id:string): Observable<any> {
    return this.http.delete(environment.BASE_URL + `/role/${id}`);
  }
}

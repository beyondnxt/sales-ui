import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(public http: HttpClient) {}

  getRole(query: any, searchQry: any): Observable<any> {
    return this.http.get(environment.BASE_URL + `/role?${query}${searchQry}`);
  }
  postRoleData(payload: any): Observable<any> {
    return this.http.post(environment.BASE_URL + '/role', payload);
  }
  deleteRole(id: string): Observable<any> {
    return this.http.delete(environment.BASE_URL + `/role/${id}`);
  }
  updateRole(id: string, payload: any): Observable<any> {
    return this.http.put(environment.BASE_URL + `/role/${id}`, payload);
  }

  getRoleById(id: number): Observable<any> {
    return this.http.get(environment.BASE_URL + `/role/${id}`);
  }
}

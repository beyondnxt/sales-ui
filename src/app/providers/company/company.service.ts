import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(public http:HttpClient) { }

  getCompanyList(searchQry: any, page: any): Observable<any> {
    return this.http.get(environment.BASE_URL + `/company${page}${searchQry}`);
  }
  deleteCompany(id:string): Observable<any> {
    return this.http.delete(environment.BASE_URL + `/company/${id}`);
  }
  postCompany(payload: any): Observable<any> {
    return this.http.post(environment.BASE_URL + '/company', payload);
  }
  updateCompany(id:string,payload:any): Observable<any> {
    return this.http.put(environment.BASE_URL + `/company/${id}`,payload);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(public http:HttpClient) { }
  getCustomers(searchQry: any, query: any): Observable<any> {
    return this.http.get(environment.BASE_URL + `/customers${query}${searchQry}`);
  }
  getAllCustomers(searchQry: any, query: any): Observable<any> {
    return this.http.get(environment.BASE_URL + `/customers/all${query}${searchQry}`);
  }
  newCustomerCreation(payload: any){
    return this.http.post(environment.BASE_URL + '/customers', payload);
  }
  updateCustomer(id:string,payload:any): Observable<any> {
    return this.http.put(environment.BASE_URL + `/customers/${id}`,payload);
  }
  deleteCustomer(id:string): Observable<any> {
    return this.http.delete(environment.BASE_URL + `/customers/${id}`);
  }
}

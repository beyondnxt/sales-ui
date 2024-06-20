import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(public http:HttpClient) { }

  getTeamData(): Observable<any> {
    return this.http.get(environment.BASE_URL + `/team`);
  }
}

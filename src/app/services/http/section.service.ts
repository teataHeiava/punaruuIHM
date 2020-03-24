import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SectionService {


  private sessionUrl = 'http://localhost:8080/api/v1/sections';
  private httpHeader = new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'});

  constructor(private http: HttpClient) {
  }

  public listerTous(): Promise<any> {
    return this.http.get(this.sessionUrl, {headers: this.httpHeader}).toPromise();
  }

  public trouver(discipline: string): Promise<any> {
    return this.http.get(this.sessionUrl + '/' + discipline, {headers: this.httpHeader}).toPromise();
  }
}

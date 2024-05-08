import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from './card';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getCards(): Observable<Card[]>{
    return this.http.get<Card[]>(`${this.apiServerUrl}/card/all`);
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from './card';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public addCard(card: Card): Observable<Card>{
    console.log(card.Id);
    return this.http.post<Card>(`${this.apiServerUrl}/card/add`, card).pipe(catchError(this.handleError));
  }

  public updateCard(card: Card): Observable<Card>{
    return this.http.put<Card>(`${this.apiServerUrl}/card/update`, card);
  }

  public deleteCard(Id: number): Observable<void>{
      return this.http.delete<void>(`${this.apiServerUrl}/card/delete/${Id}`);
  }

  public getCards(): Observable<Card[]>{
    return this.http.get<Card[]>(`${this.apiServerUrl}/card/all`);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.message}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('An error with the unique Identifier happened!'));
  }
}

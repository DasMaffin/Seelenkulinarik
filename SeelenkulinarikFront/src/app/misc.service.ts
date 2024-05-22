import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MiscService {
  constructor(private http: HttpClient) { }
  
  private apiServerUrl = 'http://localhost:8080';
  
  public UploadImage(file: File): Observable<any>{
    console.log(file);
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);

    const options = {
      headers: new HttpHeaders(),
      responseType: 'text' as 'json'
    };

    return this.http.post<any>(`${this.apiServerUrl}/misc/upload`, formData, options);
  }

  public getImages(): Observable<string>{
    const options = {
      headers: new HttpHeaders(),
      responseType: 'text' as 'json'
    };

    return this.http.get<string>(`${this.apiServerUrl}/misc/images`, options);
  }
}

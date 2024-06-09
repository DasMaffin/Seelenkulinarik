import { Injectable } from '@angular/core';
import { Card } from '../card';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  public cards: Card[] = [];
  public editCard!: Card | null | undefined;
  public deleteCard!: Card | null  | undefined;

  constructor() { }
}

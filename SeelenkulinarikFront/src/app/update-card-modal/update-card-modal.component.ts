import { Component } from '@angular/core';
import { Card } from '../card';
import { HttpErrorResponse } from '@angular/common/http';
import { CardService } from '../card.service';

@Component({
  selector: 'app-update-card-modal',
  templateUrl: './update-card-modal.component.html',
  styleUrl: './update-card-modal.component.css'
})
export class UpdateCardModalComponent {
  public editCard!: Card | null | undefined;

  constructor(private cardService: CardService){}

  public onEditCard(card: Card): void{
    this.cardService.updateCard(card).subscribe(
    (response: Card) => {
      console.log(response);
      // TODO add event to be called on backend: this.getCards();
    },
    (error: HttpErrorResponse) => {
      alert(error.message)
    });
  }
}

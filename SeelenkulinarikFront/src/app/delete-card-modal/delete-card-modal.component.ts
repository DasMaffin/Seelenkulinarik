import { Component } from '@angular/core';
import { Card } from '../card';
import { CardService } from '../card.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-card-modal',
  templateUrl: './delete-card-modal.component.html',
  styleUrl: './delete-card-modal.component.css'
})
export class DeleteCardModalComponent {
  public deleteCard!: Card | null  | undefined;

  constructor(private cardService: CardService){}

  public onDeleteCard(Id: number): void{
    this.cardService.deleteCard(Id).subscribe(
      ()=>{
        // TODO Call event on backend to get cards: this.getCards();
        alert("Card has been deleted!");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}

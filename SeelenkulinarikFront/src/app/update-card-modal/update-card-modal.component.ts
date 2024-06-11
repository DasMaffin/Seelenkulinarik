import { Component, EventEmitter, Output } from '@angular/core';
import { Card } from '../card';
import { HttpErrorResponse } from '@angular/common/http';
import { CardService } from '../card.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from '../backend/backend.service';

@Component({
  selector: 'app-update-card-modal',
  templateUrl: './update-card-modal.component.html',
  styleUrl: './update-card-modal.component.css'
})
export class UpdateCardModalComponent {
  @Output() cardAdded = new EventEmitter<void>();

  constructor(
    private activeModal: NgbActiveModal,
    public backendService: BackendService,
    private cardService: CardService){}

  public onEditCard(card: Card): void{
    if (this.backendService.editCard) {
      card.id = this.backendService.editCard.id;
    } else {
      throw new Error("Edit card is not defined");
    }
    this.cardService.updateCard(card).subscribe(
    (response: Card) => {    
      this.cardAdded.emit();
    },
    (error: HttpErrorResponse) => {
      alert(error.message)
    });
    this.close();
  }
  
  close() {
    this.activeModal.close();
  }
}

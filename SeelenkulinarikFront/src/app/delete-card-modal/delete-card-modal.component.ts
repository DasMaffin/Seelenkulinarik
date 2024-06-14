import { Component, EventEmitter, Output } from '@angular/core';
import { Card } from '../card';
import { CardService } from '../card.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BackendService } from '../backend/backend.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-card-modal',
  templateUrl: './delete-card-modal.component.html',
  styleUrl: './delete-card-modal.component.css'
})
export class DeleteCardModalComponent {
  @Output() cardAdded = new EventEmitter<void>();
  
  constructor(
    private cardService: CardService,
    private activeModal: NgbActiveModal,
    public backendService: BackendService
  ){}

  public onDeleteCard(Id: number): void{
    this.cardService.deleteCard(Id).subscribe(
      ()=>{
        this.cardAdded.emit();
        alert("Karte wurde erfolgreich gelöscht!");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    this.close();
  }
  
  close() {
    this.activeModal.close();
  }
}

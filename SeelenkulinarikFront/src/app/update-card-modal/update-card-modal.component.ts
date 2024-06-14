import { Component, EventEmitter, Output } from '@angular/core';
import { Card } from '../card';
import { HttpErrorResponse } from '@angular/common/http';
import { CardService } from '../card.service';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BackendService } from '../backend/backend.service';
import { AddImageModalComponent } from '../add-image-modal/add-image-modal.component';

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
    private cardService: CardService,
    private modalService: NgbModal){}

  public onEditCard(card: Card): void{
    if (this.backendService.editCard) {
      card.id = this.backendService.editCard.id;
      card.ImageURI = this.backendService.editCard.ImageURI;
      card.AestheticURI = this.backendService.editCard.AestheticURI;
    } else {
      throw new Error("Edit card is not defined");
    }
    console.log(card)
    this.cardService.updateCard(card).subscribe(
    (response: Card) => {    
      this.cardAdded.emit();
    },
    (error: HttpErrorResponse) => {
      alert(error.message)
    });
    this.close();
  }
  
  // openMode 0: opened for the main image
  // openMode 1: opened for the aesthetic image
  public openImageModal(openMode: number): void { // TODO put this in a service to remove duplicate code
    const modalRef: NgbModalRef = this.modalService.open(AddImageModalComponent, { ariaLabelledBy: 'modal-basic-title'});
    modalRef.componentInstance.imageSelected.subscribe(
      (file: string) => {
        if(this.backendService.editCard && openMode == 0)
          this.backendService.editCard.ImageURI = file;
        else if(this.backendService.editCard && openMode == 1)
          this.backendService.editCard.AestheticURI = file;
      });
  }

  close() {
    this.activeModal.close();
  }
}

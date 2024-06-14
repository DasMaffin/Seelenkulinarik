import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Card } from '../card';
import { HttpErrorResponse } from '@angular/common/http';
import { CardService } from '../card.service';
import { NgForm } from '@angular/forms';
import { AddImageModalComponent } from '../add-image-modal/add-image-modal.component';
import { BackendService } from '../backend/backend.service';
@Component({
  selector: 'app-add-card-modal',
  templateUrl: './add-card-modal.component.html',
  styleUrl: './add-card-modal.component.css'
})
export class AddCardModalComponent {
  @Output() cardAdded = new EventEmitter<void>();
  
  selectedImage!: string;
  selectedAesthetic!: string;
  
  constructor(
    private activeModal: NgbActiveModal,
    private cardService: CardService,
    private modalService: NgbModal
  ) { }

  public onAddCard(addForm: NgForm): void{
    this.cleanUp('AddCardModalBody');
    let addCard: Card = addForm.value;
    addCard.ImageURI = this.selectedImage;
    addCard.AestheticURI = this.selectedAesthetic;

    addCard.id = 0; // With an ID of 0 the database handles ID generation itself. It also handles it itself if the ID doesnt exist yet. 0 never exists because ID generation starts at 1. If the ID DOES exist it will override that entry
    this.cardService.addCard(addCard).subscribe(
    (response: Card) => {
      this.cardAdded.emit();
    },
    (error: HttpErrorResponse) => {
      alert(error.message)
    });
    this.close();
  }

  // Clean any modal's data so it is empty on re-open.
  public cleanUp(modal: string): void{
    const inputFields = document.getElementById(modal)?.querySelectorAll('input, select');
    if(inputFields == null) alert("No Inputs");
    if (inputFields) 
    {
      inputFields.forEach((input: Element) => 
      {
        if (input.tagName.toLowerCase() === 'input') {
          (input as HTMLInputElement).value = '';
        } else if (input.tagName.toLowerCase() === 'select') {
          const selectElement = input as HTMLSelectElement;
          selectElement.selectedIndex = -1;
        }
      });
    }
  }

  // openMode 0: opened for the main image
  // openMode 1: opened for the aesthetic image
  public openImageModal(openMode: number): void { // TODO put this in a service to remove duplicate code
    close();

    const modalRef: NgbModalRef = this.modalService.open(AddImageModalComponent, { ariaLabelledBy: 'modal-basic-title'});
    modalRef.componentInstance.imageSelected.subscribe(
      (file: string) => {
        if(openMode == 0)
          this.selectedImage = file;
        else if(openMode == 1)
          this.selectedAesthetic = file;
      });
  }

  close() {
    this.activeModal.close();
  }
}

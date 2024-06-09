import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Card } from '../card';
import { HttpErrorResponse } from '@angular/common/http';
import { CardService } from '../card.service';
import { NgForm } from '@angular/forms';
import { AddImageModalComponent } from '../add-image-modal/add-image-modal.component';
@Component({
  selector: 'app-add-card-modal',
  templateUrl: './add-card-modal.component.html',
  styleUrl: './add-card-modal.component.css'
})
export class AddCardModalComponent {
  @Output() cardAdded = new EventEmitter<void>();
  
  selectedFile!: File;
  
  constructor(
    private activeModal: NgbActiveModal,
    private cardService: CardService,
    private modalService: NgbModal
  ) { }

  public onAddCard(addForm: NgForm): void{
    document.getElementById('add-card-form')?.click();

    this.cleanUp('AddCardModalBody');

    this.cardService.addCard(addForm.value).subscribe(
    (response: Card) => {
      console.log(response);
      // this.cardAdded.emit();
    },
    (error: HttpErrorResponse) => {
      alert(error.message)
    });
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

  public openImageModal(): void {
    this.modalService.open(AddImageModalComponent, { ariaLabelledBy: 'modal-basic-title'});
  }

  close() {
    this.activeModal.close();
  }
}

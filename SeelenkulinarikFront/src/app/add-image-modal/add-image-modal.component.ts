import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MiscService } from '../misc.service';
import { Card } from '../card';

@Component({
  selector: 'app-add-image-modal',
  templateUrl: './add-image-modal.component.html',
  styleUrl: './add-image-modal.component.css'
})
export class AddImageModalComponent {
  selectedFile: any;
  constructor(
    private activeModal: NgbActiveModal,
    private miscService: MiscService,
    private modalService: NgbModal){}

  public close(): void {

    this.activeModal.close();
  }

  public onImageSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    console.error(typeof(this.selectedFile));
    console.log(this.selectedFile);
  }

  public uploadImage(): void {
    this.miscService.UploadImage(this.selectedFile).subscribe(
      response => {
        if (typeof response === 'string') {
          console.log('Upload successful: ', response);
        } else {
          console.log('Unexpected response type: ', response);
        }

        // TODO Add Event for main page to listen to: this.loadImages();
      },
      error => {
        console.error('Upload error: ', error);
      }
    );
  }

  public selectImage(imageUrl: string): void {
    // Handle the logic to use the selected image URL in the add card modal
    console.log(imageUrl);
    let cardBuilder = new Card("", "", "", "", "");
    cardBuilder.ImageURI = imageUrl;

    this.close(); // Go back to the add card modal
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MiscService } from '../misc.service';
import { Card } from '../card';

@Component({
  selector: 'app-add-image-modal',
  templateUrl: './add-image-modal.component.html',
  styleUrl: './add-image-modal.component.css'
})
export class AddImageModalComponent {
  @Output() imageSelected = new EventEmitter<string>();

  selectedFile!: File;
  images: string[] = [];

  constructor(
    private activeModal: NgbActiveModal,
    private miscService: MiscService
  ){}

  ngOnInit(): void{
    this.loadImages();
  }

  public close(): void {
    this.activeModal.close();
  }

  public onImageSelected(event: any): void { // This is the selection from the files, when uploading a new one.
    this.selectedFile = event.target.files[0];
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

  public loadImages(): void {
    this.miscService.getImages().subscribe(
      response => {
        this.images = JSON.parse(response);
      },
      error => {
        console.error(error);
      }
    );
  }

  public selectImage(imageUrl: string): void {
    // Handle the logic to use the selected image URL in the add card modal
    let cardBuilder = new Card(0, "", "", "", imageUrl); // TODO give correct card values

    this.close(); // Go back to the add card modal

    this.imageSelected.emit(imageUrl);
  }
}

import { Component, ViewChild, TemplateRef, viewChild } from '@angular/core';
import { Card } from '../card';
import { HttpErrorResponse } from '@angular/common/http';
import { CardService } from '../card.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MiscService } from '../misc.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AddCardModalComponent } from '../add-card-modal/add-card-modal.component';
import { DeleteCardModalComponent } from '../delete-card-modal/delete-card-modal.component';
import { UpdateCardModalComponent } from '../update-card-modal/update-card-modal.component';
import { BackendService } from './backend.service';

@Component({
  selector: 'app-backend',
  templateUrl: './backend.component.html',
  styleUrl: './backend.component.css'
})
export class BackendComponent {
  // Just used as constant values.
  public titleColumn: string = 'Title;';
  public bodyColumn: string = 'Body';

  images: string[] = [];

  // for sorting the table with all cards
  sortColumn: string = ''; // Store the currently sorted column
  sortDirection: number = 1; // Store the sorting direction (1 for ascending, -1 for descending)

  constructor(private cardService: CardService,
     private authService: AuthService,
     private miscService: MiscService,
     private router: Router,
     private modalService: NgbModal,
     public backendService: BackendService){}

  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['/login']);
    }
    this.getCards();    
    this.loadImages();
  }

  logout() {
    this.authService.logout();
  }
  
  openAddCardModal() {
    const modalRef: NgbModalRef = this.modalService.open(AddCardModalComponent, { ariaLabelledBy: 'modal-basic-title'});
    modalRef.componentInstance.cardAdded.subscribe(
    () => {
      this.getCards();
    });
  }

  openDeleteCardModal(){
    this.modalService.open(DeleteCardModalComponent, { ariaLabelledBy: 'modal-basic-title'});    
  }

  openEditCardModal(){
    this.modalService.open(UpdateCardModalComponent, { ariaLabelledBy: 'modal-basic-title'});    
  }

  sortTable(column: string) {
    if (column === this.sortColumn) {
      this.sortDirection = -this.sortDirection; // Reverse the sorting direction if the same column is clicked
    } else {
      this.sortColumn = column; // Update the sort column
      this.sortDirection = 1; // Reset the sorting direction to ascending
    }
  
    // Sort the cardss array based on the selected column and direction
    this.backendService.cards.sort((a, b) => {
      // Check for empty fields
      if (!a[column] && !b[column]) {
        return 0; // Both are empty, maintain their current order
      } else if (!a[column]) {
        return 1; // Only a is empty, move it to the bottom
      } else if (!b[column]) {
        return -1; // Only b is empty, move it to the bottom
      }
  
      // Compare non-empty values
      if (isNaN(a[column])) {
        return a[column].localeCompare(b[column]) * this.sortDirection;
      } else {
        return (a[column] - b[column]) * this.sortDirection;
      }
    });
  }

  public getCards(): void{
    this.cardService.getCards().subscribe(
      (response: Card[]) => {
        this.backendService.cards = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
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
}

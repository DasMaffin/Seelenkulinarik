import { Component } from '@angular/core';
import { Card } from '../card';
import { NgForm } from '@angular/forms'
import { HttpErrorResponse } from '@angular/common/http';
import { CardService } from '../card.service';

@Component({
  selector: 'app-backend',
  templateUrl: './backend.component.html',
  styleUrl: './backend.component.css'
})
export class BackendComponent {
  // Just used as constant values.
  public titleColumn: string = 'Title;';
  public bodyColumn: string = 'Body';

  // for editing cards
  public cards: Card[] = [];
  public editCard!: Card | null | undefined;
  public deleteCard!: Card | null  | undefined;

  // for sorting the table with all cards
  sortColumn: string = ''; // Store the currently sorted column
  sortDirection: number = 1; // Store the sorting direction (1 for ascending, -1 for descending)

  constructor(private cardService: CardService){}

  ngOnInit(): void {
    this.getCards();
  }

  public onOpenModal(card: Card | null | undefined, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#' + mode + 'CardModal');
    this.editCard, this.deleteCard = card;

    container?.appendChild(button);
    button.click();

    console.log(container);
    console.log(button);
    console.log(card);
  }

  sortTable(column: string) {
    if (column === this.sortColumn) {
      this.sortDirection = -this.sortDirection; // Reverse the sorting direction if the same column is clicked
    } else {
      this.sortColumn = column; // Update the sort column
      this.sortDirection = 1; // Reset the sorting direction to ascending
    }
  
    // Sort the cardss array based on the selected column and direction
    this.cards.sort((a, b) => {
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
        this.cards = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddCard(addForm: NgForm): void{
    document.getElementById('add-card-form')?.click();

    this.cleanUp('AddCardModalBody');

    this.cardService.addCard(addForm.value).subscribe(
    (response: Card) => {
      console.log(response);
      this.getCards();
    },
    (error: HttpErrorResponse) => {
      alert(error.message)
    });
  }

  public onEditCard(card: Card): void{
    console.log(card);
    this.cardService.updateCard(card).subscribe(
    (response: Card) => {
      console.log(response);
      this.getCards();
    },
    (error: HttpErrorResponse) => {
      alert(error.message)
    });
  }

  public onDeleteCard(Id: String): void{
    this.cardService.deleteCard(Id).subscribe(
      ()=>{
        this.getCards();
        alert("Card has been deleted!");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
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
}

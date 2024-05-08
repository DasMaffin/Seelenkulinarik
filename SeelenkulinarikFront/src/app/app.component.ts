import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { Card } from './card';
import { HttpErrorResponse } from '@angular/common/http';
import { CardService } from './card.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NavbarComponent]
})
export class AppComponent {
  divs = Array(3).fill(0).map((x, i) => i);
  cards: Card[] = [];
  
  constructor(private cardService: CardService){}

  ngOnInit(): void{
    this.getCards();
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

  nextSection() {
    throw new Error('Method not implemented.');
  }

  previousSection() {
    throw new Error('Method not implemented.');
  }
  title = 'SeelenkulinarikFront';
}

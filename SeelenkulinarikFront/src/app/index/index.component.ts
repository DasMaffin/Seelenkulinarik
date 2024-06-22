import { AfterViewInit, Component, ElementRef, HostListener, QueryList, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { Card } from '../card';
import { HttpErrorResponse } from '@angular/common/http';
import { CardService } from '../card.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements AfterViewInit {
  @ViewChildren('scrollDiv') divs!: QueryList<ElementRef>;
  @ViewChildren('card') cardDivs!: QueryList<ElementRef>;
  divElements: HTMLElement[] = [];
  // cardDivElements: HTMLElement[] = [];
  cards: Card[] = [];
  currentIndex: number = 0;
  
  constructor(private cardService: CardService, private cdr: ChangeDetectorRef){}

  ngOnInit(): void{
    this.getCards();
  }

  ngAfterViewInit(){
    this.divElements = this.divs.map(div => div.nativeElement);
    // this.cardDivElements = this.cardDivs.map(div => div.nativeElement);
    this.showCard(this.currentIndex);
  }

  showCard(index: number) {
    if(this.cardDivs && this.cardDivs.length > 0){

      this.cardDivs.forEach((card, i) => {
        const cardElement = card.nativeElement as HTMLElement;
        cardElement.classList.toggle('active', i === index);
      });
    }
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    event.preventDefault(); // Prevent default scrolling behavior

    const deltaY = Math.sign(event.deltaY); // Get direction of scroll
    const currentIndex = this.getCurrentIndex();

    if (deltaY === -1 && currentIndex > 0) {
      this.scrollDivIntoView(currentIndex - 1);
    } else if (deltaY === 1 && currentIndex < this.divElements.length - 1) {
      this.scrollDivIntoView(currentIndex + 1);
    }
  }

  getCurrentIndex(): number {
    const rect = this.divElements.map(div => div.getBoundingClientRect());
    const currentIndex = rect.findIndex(r =>
      {
        return r.top >= 0 && r.top < window.innerHeight
      });
    return currentIndex >= 0 ? currentIndex : 0;
  }

  scrollDivIntoView(index: number) {
    const navbarHeight = 60; // Height of the navbar
    const scrollPosition = this.divElements[index].getBoundingClientRect().top - navbarHeight;
    window.scrollBy({ top: scrollPosition, behavior: 'smooth' });
  }

  public getCards(): void{
    this.cardService.getCards().subscribe(
      (response: Card[]) => {
        this.cards = response;
        this.cdr.detectChanges();
        this.showCard(this.currentIndex);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  nextSection() {
    this.currentIndex = (this.currentIndex + 1) % this.cards.length;
    this.showCard(this.currentIndex);
  }

  previousSection() {
    this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
    this.showCard(this.currentIndex);
  }
  title = 'SeelenkulinarikFront';
}

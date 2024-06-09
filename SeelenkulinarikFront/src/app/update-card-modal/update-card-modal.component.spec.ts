import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCardModalComponent } from './update-card-modal.component';

describe('UpdateCardModalComponent', () => {
  let component: UpdateCardModalComponent;
  let fixture: ComponentFixture<UpdateCardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateCardModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateCardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

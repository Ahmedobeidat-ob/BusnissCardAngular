import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBusinessCardsComponent } from './create-business-cards.component';

describe('CreateBusinessCardsComponent', () => {
  let component: CreateBusinessCardsComponent;
  let fixture: ComponentFixture<CreateBusinessCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBusinessCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBusinessCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, OnInit } from '@angular/core';
import { ICard } from '../model/card';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cards: ICard[] = this._cardService.getCards();

  public tileId: string = '';
  public displayPanel: boolean = false;
  public card: ICard;
  public cardId: string = '';

  constructor(private _cardService: CardService) {
    this.card = {
      id: '123',
      tileId: '',
      notes: '',
      date: Date.UTC(12, 7, 1),
      name: '',
      likes: 0,
    };
  }

  ngOnInit(): void {
    this._cardService.cardEvent.subscribe((cards: ICard[]) => {
      this.cards = cards;
    });

    console.log(this.cards);
  }

  addCard(tileId: string) {
    this.tileId = tileId;
    this._cardService.displayOverlay(true);
  }
}

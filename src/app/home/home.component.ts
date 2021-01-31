import { Component, OnInit } from '@angular/core';
import { ICard } from '../model/card';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cards: ICard[];

  public displayPanel: boolean = false;
  public card: ICard;
  public cardId: string = '';

  constructor(private _cardService: CardService) {
    this.cards = this._cardService.getCards();
    this.card = {
      id: '',
      tileId: '',
      notes: '',
      date: Date.UTC(0, 0, 0),
      name: '',
      likes: 0,
    };
  }

  ngOnInit(): void {
    this._cardService.cardEvent.subscribe((cards: ICard[]) => {
      this.cards = cards;
    });
  }

  addCard(tileId: string) {
    var card = this._cardService.addCard(tileId, '');
    this._cardService.publishCard(card);
    this._cardService.displayOverlay(true);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICard } from '../model/card';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  cardId: number = 0;

  private card: ICard = {
    id: '',
    tileId: '',
    name: '',
    notes: '',
    date: Date.UTC(2022, 10, 10),
    likes: 0,
  };

  public IsPanelVisible: boolean = false;
  public cardEvent = new BehaviorSubject<ICard[]>([]);
  public overlayCardEvent = new BehaviorSubject<ICard>(this.card);
  public overlayEvent = new BehaviorSubject<boolean>(false);

  constructor() {}

  cards: ICard[] = [];

  addCard(tileId: string, notes: string) {
    var card = this.getNewCard(tileId, notes);
    if (this.cards) {
      this.cards.push(card);
    } else {
      this.cards = [];
      this.cards[0] = card;
    }
    this.cardEvent.next(this.cards);
    return card;
  }

  private getNewCard(tileId: string, notes: string) {
    var date: Date = new Date();
    var card: ICard = {
      id: this.getCardId(tileId),
      tileId: tileId,
      name: 'item',
      notes: notes,
      date: date.getDate(),
      likes: 0,
    };
    return card;
  }

  getCardId(tileId: string) {
    return 'tile' + tileId + '-card' + (this.cardId += 1);
  }

  getCards() {
    return this.cards;
  }

  getCard(cardId: string) {
    return this.cards.find((x) => x.id == cardId) ?? this.card;
  }

  updateCard(cardId: string, notes: string) {
    var index = this.cards.findIndex((x) => x.id == cardId);
    this.cards[index].notes = notes;
    this.cardEvent.next(this.cards);
  }

  updateLikes(cardId: string) {
    var index = this.cards.findIndex((x) => x.id == cardId);
    this.cards[index].likes += 1;
    this.cardEvent.next(this.cards);
  }

  deleteCard(cardId: string) {
    var index = this.cards.findIndex((x) => x.id == cardId);
    this.cards.splice(index, 1);
    this.cardEvent.next(this.cards);
  }

  displayOverlay(flag: boolean, cardId: string = '') {
    this.overlayEvent.next(flag);
  }

  publishCard(card: ICard) {
    this.overlayCardEvent.next(card);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICard } from '../model/card';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  cardToBeUpdated: string = '';
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
  public overlayEvent = new BehaviorSubject<boolean>(false);
  public overlayCardEvent = new BehaviorSubject<ICard>(this.card);

  constructor() {}

  private cards: ICard[] = [];

  addCard(tileId: string, notes: string) {
    if (this.cards) {
      this.cards.push(this.getCard(tileId, notes));
    } else {
      this.cards = [];
      this.cards[0] = this.getCard(tileId, notes);
    }
    this.cardEvent.next(this.cards);
    this.card.notes = '';
    this.card.likes = 0;
  }

  getCard(tileId: string, notes: string) {
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

  updateCard(cardId: string, notes: string) {
    var index = this.cards.findIndex((x) => x.id == cardId);
    this.cards[index].notes = notes;
    this.cardEvent.next(this.cards);
    this.cardToBeUpdated = '';
    // console.log('updatecard : ');
    // console.log(this.cards);
    this.card.notes = '';
    this.card.likes = 0;
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
    if (cardId) this.cardToBeUpdated = cardId;
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { ICard } from '../model/card';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() public card: ICard;
  constructor(public _cardService: CardService) {
    this.card = {
      id: '',
      tileId: '',
      notes: '',
      date: Date.UTC(12, 7, 1),
      name: '',
      likes: 0,
    };
  }

  ngOnInit(): void {}

  updateCard(cardId: string) {
    this._cardService.cardToBeUpdated = cardId;
    this._cardService.overlayCardEvent.next(this.card);
    this._cardService.displayOverlay(true);
  }
}

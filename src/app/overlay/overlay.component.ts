import { not } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { ICard } from '../model/card';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css'],
})
export class OverlayComponent implements OnInit {
  card: ICard = {
    id: '',
    tileId: '',
    notes: '',
    date: Date.UTC(0, 0, 0),
    name: '',
    likes: 0,
  };

  @Input() public displayPanel: boolean = false;

  constructor(private _cardService: CardService) {}

  ngOnInit(): void {
    this._cardService.overlayCardEvent.subscribe((card: ICard) => {
      this.card = card;
      console.log('inside overlay..', this.card);
    });
    this.displayPanel = this._cardService.IsPanelVisible;
    this._cardService.overlayEvent.subscribe((flag: boolean) => {
      this.displayPanel = flag;
    });
  }

  saveNotes(notes: string, event: any) {
    if (event.target.className == 'overlay') {
      this._cardService.updateCard(this.card.id, notes);
      this.hideOverlay();
    }
  }

  addCard(tileId: string, notes: string) {
    this._cardService.addCard(tileId, notes);
  }

  updateCard(cardId: string, notes: string) {
    this._cardService.updateCard(cardId, notes);
  }

  deleteCard(cardId: string) {
    if (cardId && cardId != '') {
      this._cardService.deleteCard(cardId);
    }
    this.hideOverlay();
  }

  updateLike(cardId: string) {
    if (cardId && cardId != '') {
      this._cardService.updateLikes(cardId);
    } else {
      console.warn('card id is undefined.');
    }
  }

  hideOverlay() {
    this.displayPanel = false;
  }
}

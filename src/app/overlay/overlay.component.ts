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
  public card: ICard;
  @Input() public tileId: string = '';
  @Input() public cardId: string = '';
  @Input() public displayPanel: boolean = false;

  constructor(private _cardService: CardService) {
    this.card = {
      id: '',
      tileId: '',
      notes: '',
      date: Date.UTC(12, 7, 1),
      name: '',
      likes: 0,
    };
  }

  ngOnInit(): void {
    this.displayPanel = this._cardService.IsPanelVisible;
    this._cardService.overlayEvent.subscribe((flag: boolean) => {
      this.displayPanel = flag;
    });

    this._cardService.overlayCardEvent.subscribe((card: ICard) => {
      this.card = card;
    });
  }

  saveNotes(tileId: string, notes: string) {
    var cardId = this._cardService.cardToBeUpdated;
    if (cardId && cardId != '') {
      this._cardService.updateCard(this.card.id, notes);
    } else if (tileId && tileId != '') {
      this._cardService.addCard(tileId, notes);
    }

    //reset to init
    //this.clearOverlay();
    this.hideOverlay();
    this._cardService.cardToBeUpdated = '';
  }

  addCard(tileId: string, notes: string) {
    this._cardService.addCard(tileId, notes);
  }

  updateCard(cardId: string, notes: string) {
    this._cardService.updateCard(cardId, notes);
  }

  deleteCard() {
    var cardId = this._cardService.cardToBeUpdated;
    if (cardId && cardId != '') {
      this._cardService.deleteCard(cardId);
    }
    this._cardService.cardToBeUpdated = '';
    this.hideOverlay();
  }

  updateLike() {
    var cardId = this._cardService.cardToBeUpdated;
    if (cardId && cardId != '') {
      this._cardService.updateLikes(cardId);
    } else {
      console.warn('card id is undefined.');
    }
  }

  hideOverlay() {
    this.displayPanel = false;
  }

  clearOverlay() {
    this.card.id = '';
    this.card.notes = '';
    this.card.likes = 0;
  }
}

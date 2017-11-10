import { Component, OnInit } from '@angular/core';
import { CommanderDeck } from '../shared/entities/decks/commander';

import { CardService } from '../shared/services/cards.service';
import { Card } from '../shared/entities/card';

@Component({
  selector: 'app-deckview',
  templateUrl: './deckview.component.html',
  styleUrls: ['./deckview.component.css']
})
export class DeckviewComponent implements OnInit {

  constructor(
    private cs: CardService
  ) { }

  testDeck: CommanderDeck = new CommanderDeck();
  testCard: Card;

  ngOnInit() {
    this.cs.getCardById("2eeaa0658cd1d5c56aa2f3adfaa7dbffe1b7ccbe")
      .subscribe(card => {
        this.testCard = card;
      });
  }

  addCard() {
    this.testDeck.addCard(this.testCard);
  }

  ruleCheck() {
    this.testDeck.ruleCheck();
  }

}

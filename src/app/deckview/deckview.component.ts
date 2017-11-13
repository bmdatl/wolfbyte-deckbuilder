import { Component, OnInit } from '@angular/core';
//import { CommanderDeck } from '../shared/entities/decks/commander';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CardService } from '../shared/services/cards.service';
import { Card } from '../shared/entities/card';

import { DeckService } from '../shared/services/deck.service';
import { Deck } from '../shared/entities/deck';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-deckview',
  templateUrl: './deckview.component.html',
  styleUrls: ['./deckview.component.css']
})
export class DeckviewComponent implements OnInit {

  testDeck;
  testCard: Card;
  newDeck: boolean = false;
  deckForm: FormGroup;
  selectedCommander: Card;
  results: Card[];

  constructor(
    private cs: CardService,
    private ds: DeckService,
    private fb: FormBuilder
  ) {
    this.deckForm = this.fb.group({
      name: ['', Validators.required],
      format: ['', Validators.required],
      description: '',
      commander: ''
    });
  }

  ngOnInit() {
    this.cs.getCardById("2eeaa0658cd1d5c56aa2f3adfaa7dbffe1b7ccbe")
      .subscribe(card => {
        this.testCard = card;
      });
  }



  // addCard() {
  //   this.testDeck.addCard(this.testCard);
  // }
  //
  // ruleCheck() {
  //   this.testDeck.ruleCheck();
  // }

  createDeck() {
    this.newDeck = true;
    this.deckForm = this.fb.group({
      name: ['', Validators.required],
      format: ['', Validators.required],
      description: '',
      commander: ''
    });
  }

  getDecks() {
    this.ds.getAllDecks()
      .then(decks => {
        console.log(decks);
      });
  }

  search = (keyword: any): Observable<Card[]> => {
    if (keyword) {
      return this.cs.searchCardsByName(keyword);
    }
  };

  submitDeck(deck) {
    console.log(deck);
  }

}

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
  results: any[];
  validationErrs = [];

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

  // ngOnChanges() {
  //
  //   if (this.selectedCommander.id) {
  //     console.log(this.selectedCommander);
  //     if (!this.validateCommander(this.selectedCommander)) {
  //       this.validationErrs.push({ 'Commander error': 'This card cannot be your commander.'});
  //       console.log(this.validationErrs);
  //     }
  //   }
  // }



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

  search = (keyword: any) => {
    if (keyword) {
      return this.cs.searchCardsByName(keyword);
    }
  };

  formatSearch = (data: any): string => {
    if (data) {
      return data.name;
    }
  };

  validateCommander(card) {
    if ((card.supertypes.contains('Legendary') && card.type.contains('Creature')) || card.text.contains('can be your commander')) {
      return true;
    } else {
      return false;
    }
  }

  submitDeck(deck) {
    console.log(this.selectedCommander);
    console.log(deck);
  }

}

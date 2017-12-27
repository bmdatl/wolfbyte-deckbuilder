import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeckService } from '../shared/services/deck.service';
import { CardService } from '../shared/services/cards.service';

import { Card } from '../shared/entities/card';

@Component({
  selector: 'app-deckbuilder',
  templateUrl: './deckbuilder.component.html',
  styleUrls: ['./deckbuilder.component.css']
})
export class DeckbuilderComponent implements OnInit {

  deck;
  decks;
  currentUser;
  showDecks: boolean = false;
  cardToAdd: Card;

  constructor(
    private route: ActivatedRoute,
    private deckService: DeckService,
    private cardService: CardService
  ) {
  }

  ngOnInit() {
    this.deck = this.deckService.deckEdit;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser) {
      this.deckService.getByUser(this.currentUser._id)
        .subscribe(decks => {
          this.decks = decks;
          this.deck = decks[0];
        });
    }
  }

  editDeck(deck) {
    this.deck = deck;
    this.showDecks = false;
  }

  addCard() {
    let card = this.cardToAdd;

    if (card.types.includes('Creature')) {
      this.deck.creatures.push(card);
    } else if (card.types.includes('Land')) {
      this.deck.lands.push(card);
    } else if (card.types.includes('Enchantment')) {
      this.deck.enchantments.push(card);
    } else if (card.types.includes('Instant')) {
      this.deck.instants.push(card);
    } else if (card.types.includes('Sorcery')) {
      this.deck.sorceries.push(card);
    } else if (card.types.includes('Planeswalker')) {
      this.deck.planeswalkers.push(card);
    } else if (card.types.includes('Artifact')) {
      this.deck.artifacts.push(card);
    }

  }

  viewDecks() {
    this.showDecks = !this.showDecks;
  }



}

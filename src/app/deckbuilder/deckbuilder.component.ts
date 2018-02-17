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
  cards: Card[];
  cardSearch: Card;
  quantity: number = 1;
  cardToAdd: Card;

  formats: string[];

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
          if (decks) {
            this.decks = decks;
          }
        });
    }
    this.formats = ['Commander', 'Standard', 'Modern', 'Vintage', 'Legacy', 'Limited'];
  }

  editDeck(e) {
    console.log(e);
  }

  cardClick(card) {
    console.log(card);
    return false;
  }

  addCard(cardType?, inc_card?) {
    let card = inc_card ? inc_card : this.cardSearch;

    console.log(card);

    if (!cardType && card) {
      if (card.types.includes('Planeswalker')) {
        cardType = 'planeswalkers';
      } else if (card.types.includes('Land')) {
        cardType = 'lands';
      } else if (card.types.includes('Creature')) {
        cardType = 'creatures';
      } else if (card.types.includes('Artifact')) {
        cardType = 'artifacts';
      } else if (card.types.includes('Sorcery')) {
        cardType = 'sorceries';
      } else if (card.types.includes('Instant')) {
        cardType = 'instants';
      } else if (card.types.includes('Enchantment')) {
        cardType = 'enchantments';
      }
    }
    let cards = this.deck[cardType];
      if (cards.length) {
        for (let i = 0; i < cards.length; i++) {
          if (cards[i]['name'] === card.name) {
            if ((parseInt(cards[i].quantity + this.quantity)) > 4 && !card.type.includes('Basic Land')) {
              this.deck[cardType][i].quantity = 4;
            } else {
              parseInt(this.deck[cardType][i].quantity += this.quantity);
              this.quantity = 1;
            }
          }
        }
        card.quantity = this.quantity;
        this.deck[cardType].push(card);
      } else {
        card.quantity = this.quantity;
        this.deck[cardType].push(card);
      }

    this.updateDeck();
  }

  addOne(card) {
    card.quantity++;
    this.updateDeck();
  }

  removeCard(cardType, card) {
    let cards = this.deck[cardType];
    let index = cards.indexOf(card);
    if (index > -1 && cards[index].quantity > 1) {
      this.deck[cardType][index].quantity--;
    } else {
      this.deck[cardType].splice(index, 1);
    }
    this.updateDeck();
  }

  removeAllCards(card) {
    if (card.types.includes('Creature')) {
      this.deck.creatures = this.deck.creatures.filter(c => c.name != card.name);
    } else if (card.types.includes('Land')) {
      this.deck.lands = this.deck.lands.filter(c => c.name != card.name);
    } else if (card.types.includes('Enchantment')) {
      this.deck.enchantments = this.deck.enchantments.filter(c => c.name != card.name);
    } else if (card.types.includes('Instant')) {
      this.deck.instants = this.deck.instants.filter(c => c.name != card.name);
    } else if (card.types.includes('Sorcery')) {
      this.deck.sorceries = this.deck.sorceries.filter(c => c.name != card.name);
    } else if (card.types.includes('Planeswalker')) {
      this.deck.planeswalkers = this.deck.planeswalkers.filter(c => c.name != card.name);
    } else if (card.types.includes('Artifact')) {
      this.deck.artifacts = this.deck.artifacts.filter(c => c.name != card.name);
    }
    this.updateDeck();
  }

  updateDeck() {
    this.deckService.update(this.deck._id, this.deck)
      .subscribe(res => {
        console.log(this.deck);
        this.quantity = 1;
      });
  }

  getCount(cardType) {
    let cards = this.deck[cardType];
    let count = 0;
    for (let card of cards) {
      count += parseInt(card.quantity);
    }
    return count;
  }

  viewDecks() {
    this.showDecks = !this.showDecks;
  }

  createNewDeck() {

  }

  saveDeck() {

  }

  searchCards() {
    this.cardService.searchCardsByName(this.cardSearch.name)
      .subscribe(cards => {
        this.cards = cards;
      });
  }

  enterKeyPressed(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.searchCards();
    }
  }

  search = (keyword: any) => {
    if (keyword) {
      return this.cardService.searchCardsByName(keyword);
    }
  };

  formatSearch = (data: any): string => {
    if (data) {
      return `${data.name}`;
    }
  };

  commanderModal() {

  }

  getTCGCard(name: string) {
    return this.cardService.getTCGCard(name)
      .subscribe(card => {
        console.log(card);
      });
  }



}

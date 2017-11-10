import { Component, OnInit } from '@angular/core';
import { CardService } from '../shared/services/cards.service';
import { Card, Set, Legality, Ruling, ForeignName } from '../shared/entities/exports';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  cardSearch: string = null;
  cards: Card[];
  sets: {}[];

  multiselect: boolean = false;

  constructor(
    private cs: CardService
  ) {}

  ngOnInit() {
  }

  getCardSet(name) {
    this.cs.searchSetsByName(name)
      .subscribe(set => {
        console.log(set);
      });
  }

  searchCards() {
    this.cs.searchCardsByName(this.cardSearch)
      .subscribe(cards => {
        console.log(cards);
        this.cards = cards;
      });
  }

  getAllCards() {
    this.cs.getAllCards()
      .subscribe(cards => {
        console.log(cards);
        this.cards = cards;
      });
  }

  enterKeyPressed(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.searchCards();
    }
  }

  multiselectClick() {
    this.multiselect = !this.multiselect;
  }

}

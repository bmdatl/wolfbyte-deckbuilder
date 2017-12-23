import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { CardService } from '../shared/services/cards.service';
import { Card, Set, Legality, Ruling, ForeignName } from '../shared/entities/exports';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input() searchSet;

  cardSearch: Card;
  extendedCard;
  cards: Card[];
  sets: {}[];

  modalRef: BsModalRef;
  viewCard;

  multiselect: boolean = false;

  constructor(
    private cs: CardService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    if (this.searchSet) {

    }
  }

  getCardSet(name) {
    this.cs.searchSetsByName(name)
      .subscribe(set => {
        console.log(set);
      });
  }

  searchCards() {
     this.cs.searchCardsByName(this.cardSearch.name)
      .subscribe(cards => {
        this.cards = cards;
      });
  }

  searchCardsBySet() {
    this.cs.getCardsBySet(this.searchSet.code)
      .subscribe(cards => {
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

  search = (keyword: any) => {
    if (keyword) {
      return this.cs.searchCardsByName(keyword);
    }
  };

  formatSearch = (data: any): string => {
    if (data) {
      return `${data.name} | ${data.setName}`;
    }
  };

  goToCard(template: TemplateRef<any>) {
    if (this.cardSearch.type) {
      this.cs.getTCGCard(this.cardSearch.name)
        .map(card => JSON.parse(card._body))
        .subscribe(card => {
          this.extendedCard = card.results;
          this.showCardModal(template);
          console.log(this.extendedCard);
        });
    }
  }

  showCardModal(template) {
    this.modalRef = this.modalService.show(template);
    return false;
  }

}

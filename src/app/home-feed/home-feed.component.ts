import { AfterViewInit, Component, OnChanges, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { FormBuilder, FormGroup } from '@angular/forms';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';

import { CardService } from '../shared/services/cards.service';

import { User } from '../shared/entities/user';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Data } from '@angular/router';
import { Deck } from '../shared/entities/deck';


@Component({
  selector: 'app-home-feed',
  templateUrl: './home-feed.component.html',
  styleUrls: ['./home-feed.component.css'],
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;   
    }
  `]
})
export class HomeFeedComponent implements OnInit {

  sets;
  viewSet;
  viewCard;
  setDtOptions: DataTables.Settings = {};
  cardDtOptions: DataTables.Settings = {};

  showFilters: boolean = false;
  filterOptions;
  filters: Array<string> = [];

  myDecks: Deck[];

  modalRef: BsModalRef;

  constructor(
    private cardService: CardService,
    private modalService: BsModalService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.setDtOptions = {
      pageLength: 25,
      order: [[2, 'desc']]
    };
    this.cardDtOptions = {
      pageLength: 25
    };

    this.cardService.getAllSets()
      .subscribe(sets => {
        this.sets = sets;
      });

    this.filterOptions = [
      {
        name: "creature",
        value: "creature",
        checked: false
      },
      {
        name: "enchantment",
        value: "enchantment",
        checked: false
      },
      {
        name: "sorcery",
        value: "sorcery",
        checked: false
      },
      {
        name: "instant",
        value: "instant",
        checked: false
      },
      {
        name: "artifact",
        value: "artifact",
        checked: false
      },
      {
        name: "common",
        value: "common",
        checked: false
      },
      {
        name: "uncommon",
        value: "uncommon",
        checked: false
      },
      {
        name: "rare",
        value: "rare",
        checked: false
      },
      {
        name: "mythic",
        value: "mythic rare",
        checked: false
      },
      {
        name: "legendary",
        value: "legendary",
        checked: false
      }
    ];
  }

  optionsChanged(option) {
    if (option.checked) {
      this.filters.push(option.value);
    } else {
      this.filters = this.filters.filter(i => i != option.value);
    }
    console.log(this.filters);
  }

  // TODO: when other sets are clicked, datatables fucks up. fix that shit
  getSetCards(code: string, name: string) {
    this.cardService.getCardsBySet(code)
      .subscribe(cards => {
        let retrievedCards = [];
        for (let card of cards) {
          if (card.rarity !== 'Basic Land') {
            retrievedCards.push(card);
          }
        }
        this.viewSet = retrievedCards;
        this.viewSet['currentSet'] = name;
      });
    return false;
  }

  showCardModal(template: TemplateRef<any>, card) {
    this.viewCard = card;
    this.modalRef = this.modalService.show(template);
    return false;
  }

  viewFilters() {
    this.showFilters = !this.showFilters;
  }

  getUserDecks() {

  }



}

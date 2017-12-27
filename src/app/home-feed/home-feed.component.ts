import {
  AfterViewInit, Component, OnChanges, OnInit, Output, TemplateRef, ViewChild,
  ViewChildren, QueryList
} from '@angular/core';

import { DataTableDirective } from 'angular-datatables';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';

import { CardService } from '../shared/services/cards.service';

import { User } from '../shared/entities/user';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Data, NavigationExtras, Router } from '@angular/router';
import { Deck } from '../shared/entities/deck';
import { DeckService } from '../shared/services/deck.service';


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
  trigger = new Subject();
  @ViewChildren(DataTableDirective)
    tables: QueryList<DataTableDirective>;

  setDtOptions = {};
  cardDtOptions = {};

  sets;
  viewSet;
  viewCard;

  showFilters: boolean = false;
  filterOptions;
  filters: Array<string> = [];

  myDecks: Deck[];
  deckForm: FormGroup;

  modalRef: BsModalRef;
  currentUser;

  constructor(
    private cardService: CardService,
    private deckService: DeckService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.setDtOptions = {
      pageLength: 25,
      order: [[2, 'desc']]
    };
    this.cardDtOptions = {
      pageLength: 25
    };

    this.deckForm = this.fb.group({
      name: ['', Validators.required],
      description: '',
      format: ['', Validators.required]
    });

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

        if (!this.viewSet) {
          this.viewSet = retrievedCards;
          this.viewSet['currentSet'] = name;
          setTimeout(() => {
            this.trigger.next();
          });
        } else {
          this.tables.forEach(table => {
            if (table.dtTrigger) {
              table.dtInstance.then((dt: DataTables.Api) => {
                dt.destroy();
                this.viewSet = retrievedCards;
                this.viewSet['currentSet'] = name;
                setTimeout(() => {
                  this.trigger.next();
                });
              });
            }
          });
        }
      });
    return false;
  }

  showCardModal(template: TemplateRef<any>, card) {
    this.viewCard = card;
    this.modalRef = this.modalService.show(template);
    return false;
  }

  showDeckModal(template: TemplateRef<any>, card?) {
    if (this.currentUser) {
      console.log(this.currentUser);
      this.modalRef = this.modalService.show(template);
    } else {
      alert("you must be logged in to create decks!");
    }
  }

  viewFilters() {
    this.showFilters = !this.showFilters;
  }

  getUserDecks() {

  }

  submitNewDeck(formValues) {
    formValues['user_id'] = this.currentUser._id;
    this.deckService.create(formValues)
      .map(deck => deck.json())
      .subscribe(deck => {
        this.deckService.deckEdit = deck;
        this.modalRef.hide();
        this.router.navigate(['deckbuilder'], deck);
      });
  }



}

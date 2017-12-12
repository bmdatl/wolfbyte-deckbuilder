import { Component, OnInit, Output } from '@angular/core';

import { CardService } from '../shared/services/cards.service';

import { User } from '../shared/entities/user';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-home-feed',
  templateUrl: './home-feed.component.html',
  styleUrls: ['./home-feed.component.css']
})
export class HomeFeedComponent implements OnInit {

  @Output() search: EventEmitter<any> = new EventEmitter();

  // currentUser: User;
  sets;
  viewSet;
  setDtOptions: DataTables.Settings = {};
  cardDtOptions: DataTables.Settings = {};

  constructor(
    private cardService: CardService
  ) { }

  ngOnInit() {
    //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

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
  }

  // TODO: when other sets are clicked, datatables fucks up. fix that shit
  getSetCards(code: string, name: string) {
    this.cardService.getCardsBySet(code)
      .subscribe(cards => {
        this.viewSet = cards;
        this.viewSet['currentSet'] = name;
      });
    // this.search.emit(code);
    return false;
  }

  backToSets() {
    this.viewSet = null;
  }

}

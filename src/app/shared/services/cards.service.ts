import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { Card } from '../entities/card';

//individual reactive functions
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CardService {

  constructor(
    private http: Http
  ) {}

  baseUrl = 'https://api.magicthegathering.io/v1';

  searchSetsByName(name: string): Observable<Response[]> {
    let url = this.baseUrl + `/sets/?name=${name}`;
    return this.http.get(url)
      .map(results => results.json().sets)
      .catch(this.error);
  }

  searchCardsByName(name: string): Observable<Card[]> {
    let url = this.baseUrl + `/cards/?name=${name}`;
    return this.http.get(url)
      .map(res => res.json().cards)
      .map(data => {
        let cards = [];
        for (let card of data) {
          cards.push(new Card(card));
        }
        return cards;
      })
      .catch(this.error);
  }

  getAllCards(): Observable<Card[]> {
    let url = this.baseUrl + `/cards`;
    return this.http.get(url)
      .map(results => results.json().cards)
      .catch(this.error);
  }

  private error(err: any) {
    return Observable.throw(err || err.message);
  }

}

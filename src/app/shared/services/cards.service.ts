import { Headers, Http, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { tcgConfig } from '../../app.config';

import { Card } from '../entities/card';

//individual reactive functions
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class CardService {

  constructor(
    private http: Http
  ) {}

  baseUrl = 'https://api.magicthegathering.io/v1';
  tcgToken: string;

  searchSetsByName(name: string): Observable<Response[]> {
    let url = this.baseUrl + `/sets/?name=${name}`;
    return this.http.get(url)
      .map(results => results.json().sets)
      .catch(this.error);
  }

  searchCardsByName(name: string): Observable<Card[]> {
    let url = this.baseUrl + `/cards/?name=${name}`;
    console.log(url);
    return this.http.get(url)
      .map(res => res.json().cards)
      .map(data => {
        return data;
        // let cards = [];
        // for (let card of data) {
        //   cards.push(new Card(card));
        // }
        // return cards;
      })
      .catch(this.error);
  }

  getCardsBySet(code: string): Observable<Card[]> {
    let url = this.baseUrl + `/cards/?set=${code}`;
    return this.http.get(url)
      .map(results => results.json().cards)
      // .flatMap(results => {
      //   if (!this.tcgToken) {
      //     this.getTCGToken();
      //   } else {
      //     for (let card of results) {
      //       this.http.get(``)
      //     }
      //     //return this.http.get(`${tcgConfig.apiUrl}/`)
      //   }
      // })
      .catch(this.error);
  }

  getCardById(id): Observable<Card> {
    let url = this.baseUrl + `/cards/${id}`;
    return this.http.get(url)
      .map(results => results.json().card)
      .catch(this.error);
  }

  getAllCards(): Observable<Card[]> {
    let url = this.baseUrl + `/cards`;
    return this.http.get(url)
      .map(results => results.json().cards)
      .catch(this.error);
  }

  getAllSets(): Observable<Response[]> {
    let url = this.baseUrl + '/sets';

    return this.http.get(url)
      .map(results => results.json().sets)
      .catch(this.error);
  }

  private error(err: any) {
    return err;
  }

}

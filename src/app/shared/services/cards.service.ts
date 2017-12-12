import { Headers, Http, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { tcgConfig } from '../../app.config';

import { Card } from '../entities/card';

//individual reactive functions
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
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

    // surely there's a better fuckin way to do this...
    // how dost thou properly paginate?

    let url = this.baseUrl + `/cards/?set=${code}&page=1`;
    let url2 = this.baseUrl + `/cards/?set=${code}&page=2`;
    let url3 = this.baseUrl + `/cards/?set=${code}&page=3`;
    let url4 = this.baseUrl + `/cards/?set=${code}&page=4`;

    let data = [];
    return this.http.get(url)
      .map(response => {
        data.push(response.json().cards);
      })
      .mergeMap(() => {
        return this.http.get(url2)
          .map(response => {
            data.push(response.json().cards)
          })
          .mergeMap(() => {
            return this.http.get(url3)
              .map(response => {
                data.push(response.json().cards);
              })
              .mergeMap(()=> {
                return this.http.get(url4)
                  .map(response => {
                    data.push(response.json().cards);
                    return data;
                  })
            })
          });
      }).map(data => {
        let toReturn = [];
        for (let i in data) {
          for (let card of data[i]) {
            toReturn.push(card);
          }
        }
        return toReturn;
      });

    // return this.http.get(url2)
    //   .map(response => response.json().cards)
    //   .catch(this.error);
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

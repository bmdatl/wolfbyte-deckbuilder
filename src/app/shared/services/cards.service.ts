import { Headers, Http, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { tcgConfig } from '../../app.config';
import { appConfig } from '../../app.config'

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

  baseUrl = appConfig.apiUrl;
  mtgUrl = 'https://api.magicthegathering.io/v1';
  tcgUrl = 'https://api.tcgplayer.com/v1.6.0';

  searchSetsByName(name: string): Observable<Response[]> {
    let url = this.mtgUrl + `/sets/?name=${name}`;
    return this.http.get(url)
      .map(results => results.json().sets)
      .catch(this.error);
  }

  searchCardsByName(name: string): Observable<any> {
    let url = this.mtgUrl + `/cards/?name=${name}&contains=imageUrl`;
    return this.http.get(url)
      .map(res => res.json().cards)
      .map(data => {
        // return data;
        let cards = [];
        for (let card of data) {
          cards.push(card);
        }
        return cards;
      })
      .catch(this.error);
  }

  getCardsBySet(code: string): Observable<Card[]> {

    // surely there's a better fuckin way to do this...
    // how dost thou properly paginate?

    let url = this.mtgUrl + `/cards/?set=${code}&page=1`;
    let url2 = this.mtgUrl + `/cards/?set=${code}&page=2`;
    let url3 = this.mtgUrl + `/cards/?set=${code}&page=3`;
    let url4 = this.mtgUrl + `/cards/?set=${code}&page=4`;

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

    // let url = this.mtgUrl + `/cards/?set=${code}&pageSize=200`;
    //
    // return this.http.get(url)
    //   .map(response => response.json().cards)
    //   .catch(this.error);
  }

  getCardById(id): Observable<Card> {
    let url = this.mtgUrl + `/cards/${id}`;
    return this.http.get(url)
      .map(results => results.json().card)
      .catch(this.error);
  }

  getAllCards(): Observable<Card[]> {
    let url = this.mtgUrl + `/cards`;
    return this.http.get(url)
      .map(results => results.json().cards)
      .catch(this.error);
  }

  getAllSets(): Observable<Response[]> {
    let url = this.mtgUrl + '/sets';

    return this.http.get(url)
      .map(results => results.json().sets)
      .catch(this.error);
  }

  getTCGCard(name: string): Observable<any> {
    let url = `${this.baseUrl}/cards/getTCGCard/${name}`;

    return this.http.get(url);
      // .map(results => results.json())
      // .catch(this.error);
  }

  private error(err: any) {
    return err;
  }

}

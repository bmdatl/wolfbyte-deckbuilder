import { Injectable } from '@angular/core';
import { Deck } from '../entities/deck';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DeckService {
  private url = 'http://localhost:3000/api/decks';

  constructor(private http: Http) {}

  getAllDecks(): Promise<void | Deck[]> {
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json() as Deck[])
      .catch(this.handleError);
  }

  createDeck(deck: Deck): Promise<void | Deck> {
    return this.http.post(this.url, deck)
      .toPromise()
      .then(response => response.json() as Deck)
      .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}

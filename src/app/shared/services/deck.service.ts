import { Injectable } from '@angular/core';
import { Deck } from '../entities/deck';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DeckService {

  deckEdit: Deck;

  constructor(private http: Http) {}

  getAll() {
    return this.http.get('/decks')
      .map((response: Response) => response.json());
  }

  getByUser(user_id: string) {
    return this.http.get(`/decks/getUserDecks/${user_id}`)
      .map((response: Response) => response.json());
  }

  getById(_id: string) {
    return this.http.get(`/decks/${_id}`)
      .map((response: Response) => response.json());
  }

  create(deck: Deck) {
    return this.http.post('/decks', deck)
      .map((response: Response) => response.json());
  }

  update(_id: string, data: any) {
    return this.http.put(`/decks/${_id}`, data);
  }

  delete(_id: string) {
    return this.http.delete(`/decks/${_id}`);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}

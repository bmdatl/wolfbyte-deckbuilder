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
    return this.http.post('/decks', deck);
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


// Accept:application/json, text/plain, */*
// Accept-Encoding:gzip, deflate
// Accept-Language:en-US,en;q=0.9
// Authorization:Basic 3c7ec04008aff7b3ac546c17de0407efe6509b30
// Connection:keep-alive
// DNT:1
// Host:52.45.249.118:8080
// Origin:http://localhost:4200
// Referer:http://localhost:4200/login
// User-Agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36

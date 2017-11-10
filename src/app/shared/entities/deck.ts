import { Card } from './card';

export class Deck {

  public id: number;
  public format: string;
  public cards: Card[] = [];
  public numCards: number;
  public numLand: number;
  public numCreature: number;
  public numEnchantment: number;
  public numSorcery: number;
  public numInstant: number;
  public numArtifact: number;
  public numPlaneswalker: number;
  public colors: string[];
  public colorIdentity: string;
  public priceEstimates: string[];
  public upvotes: number;

  constructor() {

  }

  addCard(card: Card) {
    this.cards.push(new Card(card));
    this.numCards = this.cards.length;
  }

  removeCard(card: Card) {
    let index = this.cards.indexOf(card);
    if (index > -1) {
      this.cards.splice(index, 1);
    }
  }
}

import { Card } from './card';

export class Deck {

  public _id?: string;
  public userId?: string;
  public format: string;
  public name: string;
  public cards?: Card[] = [];

  // generated information
  public colors?: string[];
  public colorIdentity?: string;
  public priceEstimate?: string;


  // public numCards: number;
  // public numLand: number;
  // public numCreature: number;
  // public numEnchantment: number;
  // public numSorcery: number;
  // public numInstant: number;
  // public numArtifact: number;
  // public numPlaneswalker: number;
  // public colors: string[];
  // public colorIdentity: string;
  // public priceEstimates: string[];
  // public upvotes: number;

}

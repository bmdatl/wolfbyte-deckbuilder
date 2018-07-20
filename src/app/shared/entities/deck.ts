import { Card } from './card';

export class Deck {

  public _id: string;
  public user_id: string;
  public format: string;
  public name: string;

  public creatures: Card[];
  public lands: Card[];
  public enchantments: Card[];
  public instants: Card[];
  public sorceries: Card[];
  public planeswalkers: Card[];
  public artifacts: Card[];
  public commanders: Card[];

  // generated information
  public colors?: string[];
  public colorIdentity?: string;
  public priceEstimate?: string;

}

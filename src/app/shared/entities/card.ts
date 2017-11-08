import { Legality } from './legality';
import { Ruling } from './ruling';
import { ForeignName } from './foreign-name';

export class Card {

  public artist: string = null;
  public cmc: number = null;
  public colorIdentity: string[] = null;
  public colors: string[] = null;
  public flavor: string = null;
  public foreignNames: ForeignName[] = null;
  public id: string =  null;
  public imageUrl: string = null;
  public layout: string = null;
  public legalities: Legality[] = null;
  public manaCost: string = null;
  public name: string = null;
  public number: string = null;
  public printings: string[] = null;
  public rarity: string = null;
  public releaseDate: string = null;
  public rulings: Ruling[] = null;
  public set: string = null;
  public setName: string = null;
  public source: string = null;
  public text: string = null;
  public type: string = null;
  public types: string[] = null;

  constructor(data = null) {
    if (data) {
      for (let key in data) {
        if (this.hasOwnProperty(key)) {
          this[key] = data[key];
        } else {
        }
      }
    }
  }

  static create(data) {
    return new Card(data);
  }

}

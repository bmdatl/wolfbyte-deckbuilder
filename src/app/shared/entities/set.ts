export class Set {

  public block: string = null;
  public booster: string[] = null;
  public border: string = null;
  public code: string = null;
  public magicCardsInfoCode: string = null;
  public name: string = null;
  public releaseDate: string = null;
  public type: string = null;

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
    return new Set(data);
  }

}

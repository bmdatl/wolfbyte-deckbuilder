import { Deck } from '../deck';
import { Card } from '../card';

import * as _ from '../../../../../node_modules/underscore/underscore-min.js';

export class CommanderDeck extends Deck {

  public cardMin = 100;
  public cardMax = 'none';
  public commander: Card;

  constructor() {
    super();
  }

  addCard(card: Card) {
    super.addCard(card);
  }

  ruleCheck() {
    if (!this.checkMinMax() || !this.checkCommander() || !this.checkLegality() || this.checkDuplicates()) {
      console.log('rule check failed');
      return false;
    }
  }

  checkMinMax() {
    if (this.numCards >= this.cardMin) {
      return true;
    } else {
      return false;
    }
  }

  checkCommander() {
    if (this.commander) {
      if (this.commander.supertypes.includes('Legendary') || this.commander.text.includes('can be your commander')) {
        return true;
      } else {
        return false;
      }
    }
     else {
      return false;
    }
  }

  checkLegality() {

    let banned = [];
    for (let card of this.cards) {
      banned.push(_.where(card.legalities, { format: "Commander", legality: "Banned" }));
    }
    if (banned.length) {
      return false;
    } else {
      return true;
    }
  }

  checkDuplicates() {
    let seen = new Set();
    return this.cards.some(function(currentObject) {
      return seen.size === seen.add(currentObject.name).size;
    });
  }


}

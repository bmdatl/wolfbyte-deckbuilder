import { Pipe, PipeTransform } from '@angular/core';
import { Card } from '../entities/card';

@Pipe({name: 'cardFilter'})
export class CardFilterPipe implements PipeTransform {
  transform(cards: any[], query: string[]): any[] {

    if (!query || query.length === 0) {
      return cards;
    } else {
      return cards.filter(card => {
        return card.type.toLowerCase().includes(query) ||
          card.rarity.toLowerCase().includes(query);
      });
    }
  }

}

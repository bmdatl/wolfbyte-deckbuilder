import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {

  transform(data: any[], query: string): any[] {

    if (query) {
      return _.filter(data, row=> {
        return (row.name ? row.name.toLowerCase().indexOf(query.toLowerCase()) > -1 : '') ||
          (row.email ? row.email.toLowerCase().indexOf(query.toLowerCase()) > -1 : '') ||
          (row.team ? row.team.name.toLowerCase().indexOf(query.toLowerCase()) > -1 : '') ||
          (row.displayName ? row.displayName.toLowerCase().indexOf(query.toLowerCase()) > -1 : '') ||
          (row.playerId ? row.playerId.indexOf(query) > -1 : '') ||
          (row.id ? (row.id+'').indexOf(query) > -1 : '');
      });
    }
    return data;
  }
}

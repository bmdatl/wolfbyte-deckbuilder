import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LocalStorageService {
  private sub = new Subject<string>();

  detectChanges(): Observable<any> {
    return this.sub.asObservable();
  }

  setItem(key: string, data: any) {
    localStorage.setItem(key, data);
    this.sub.next('set');
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
    this.sub.next('removed');
  }
}

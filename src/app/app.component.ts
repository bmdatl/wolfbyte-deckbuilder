import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './shared/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private ls: LocalStorageService) {}

  user: string = null;

  ngOnInit() {
    // user a custom localstorage service to subscribe to an observable for change detection
    //TODO: when logging out, component is changed after it has been checked, which throws an error
    this.user = localStorage.getItem('currentUser');
    this.ls.detectChanges().subscribe(change => {
      if (change === 'set') {
        this.user = localStorage.getItem('currentUser');
      } else if (change === 'removed') {
        this.user = null;
      }
    });
  }

}

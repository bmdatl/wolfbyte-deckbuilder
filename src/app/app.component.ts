import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './shared/services/local-storage.service';
import { AuthenticationService } from './shared/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private ls: LocalStorageService,
    private authService: AuthenticationService
  ) {}

  user;

  ngOnInit() {
    // user a custom localstorage service to subscribe to an observable for change detection
    //TODO: when logging out, component is changed after it has been checked, which throws an error
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.ls.detectChanges().subscribe(change => {
      if (change === 'set') {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
       } else if (change === 'removed') {
        this.user = null;
      }
    });
  }

  logout() {
    this.authService.logout();
    return false;
  }

}

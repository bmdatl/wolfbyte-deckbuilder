import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../shared/services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private ls: LocalStorageService
  ) { }

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

  goHome() {
    this.router.navigate(['home']);
  }

}

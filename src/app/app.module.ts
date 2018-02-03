import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app.routing';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap';
import { myHttpProvider } from './shared/helpers/my-http';

import { NguiAutoCompleteModule } from '@ngui/auto-complete';

import { AppComponent } from './app.component';

import { CardService } from './shared/services/cards.service';
import { DeckService } from './shared/services/deck.service';
import { UserService } from './shared/services/user.service';
import { AuthenticationService } from './shared/services/authentication.service';
import { AlertService } from './shared/services/alert.service';

import { SafePipe } from './shared/pipes/safe-pipe';
import { DataFilterPipe } from './shared/pipes/datafilter-pipe';
import { HomeFeedComponent } from './home-feed/home-feed.component';
import { SearchComponent } from './search/search.component';
import { DeckviewComponent } from './deckview/deckview.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './shared/directives/alert/alert.component';
import { LocalStorageService } from './shared/services/local-storage.service';
import { ProfileComponent } from './profile/profile.component';
import { AdvCardFiltersComponent } from './shared/components/adv-card-filters/adv-card-filters.component';
import { CardFilterPipe } from './shared/pipes/card-filter-pipe';
import { DeckbuilderComponent } from './deckbuilder/deckbuilder.component';
import { BlogComponent } from './blog/blog.component';

@NgModule({
  declarations: [
    AppComponent,
    SafePipe,
    CardFilterPipe,
    HomeFeedComponent,
    SearchComponent,
    DeckviewComponent,
    LoginComponent,
    AlertComponent,
    ProfileComponent,
    AdvCardFiltersComponent,
    DeckbuilderComponent,
    BlogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    NguiAutoCompleteModule,
    DataTablesModule,
    ModalModule.forRoot()
  ],
  providers: [
    CardService,
    DeckService,
    UserService,
    AuthenticationService,
    AlertService,
    LocalStorageService,
    myHttpProvider
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app.routing';

import { NguiAutoCompleteModule } from '@ngui/auto-complete';

import { AppComponent } from './app.component';

import { CardService } from './shared/services/cards.service';
import { DeckService } from './shared/services/deck.service';
import { SafePipe } from './shared/pipes/safe-pipe';
import { HomeFeedComponent } from './home-feed/home-feed.component';
import { SearchComponent } from './search/search.component';
import { DeckviewComponent } from './deckview/deckview.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    SafePipe,
    HomeFeedComponent,
    SearchComponent,
    DeckviewComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    NguiAutoCompleteModule
  ],
  providers: [
    CardService,
    DeckService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

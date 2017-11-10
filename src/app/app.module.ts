import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';

import { CardService } from './shared/services/cards.service';
import { SafePipe } from './shared/pipes/safe-pipe';
import { HomeFeedComponent } from './home-feed/home-feed.component';
import { SearchComponent } from './search/search.component';
import { DeckviewComponent } from './deckview/deckview.component';

@NgModule({
  declarations: [
    AppComponent,
    SafePipe,
    HomeFeedComponent,
    SearchComponent,
    DeckviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [
    CardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

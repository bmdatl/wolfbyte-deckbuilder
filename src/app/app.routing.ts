import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { HomeFeedComponent } from './home-feed/home-feed.component';
import { DeckviewComponent } from './deckview/deckview.component';
import { DeckbuilderComponent } from './deckbuilder/deckbuilder.component';
import { LoginComponent } from './login/login.component';
import { BlogComponent } from './blog/blog.component';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';

export const appRoutes: Routes = [
  // {
  //   path: '',
  //   component: AppComponent,
  //   children: [
  //     { path: 'search', component: SearchComponent },
  //     { path: 'feed', redirectTo: 'home' },
  //     { path: 'home', component: HomeFeedComponent },
  //     { path: 'decks', component: DeckviewComponent}
  //   ]
  // }
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'home', component: HomeFeedComponent },
  { path: 'decks', component: DeckviewComponent },
  { path: 'deckbuilder', component: DeckbuilderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'advanced-search', component: AdvancedSearchComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

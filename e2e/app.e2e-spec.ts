import { WolfbyteDeckbuilderPage } from './app.po';

describe('wolfbyte-deckbuilder App', () => {
  let page: WolfbyteDeckbuilderPage;

  beforeEach(() => {
    page = new WolfbyteDeckbuilderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

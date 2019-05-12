export const appConfig = {
  apiUrl: 'http://c498ea61.ngrok.io',
};

export const tcgConfig = {
  apiUrl: 'https://api.tcgplayer.com/v1.6.0',
  tokenUrl: 'https://api.tcgplayer.com/token',
  pubkey: "30D51A1F-4A8E-4BD0-B3F9-251F54AC50E0",
  privkey: "6152F634-4E41-40E9-B09A-C15CF40B6444",
  token: "15C916FE-9A28-4777-8E90-EADAD52D1C81",
  appId: 1304
};

export const DECK_FORMATS = [
  {
    name: 'Commander',
    alt: 'EDH',
    cards: 100,
    allowDupes: false,
    lifeTotal: 40
  },
  {
    name: 'Modern',
    alt: 'Modern',
    cards: 60,
    allowDupes: true,
    lifeTotal: 20
  },
  {
    name: 'Standard',
    alt: 'Standard',
    cards: 60,
    allowDupes: true,
    lifeTotal: 20
  },
  {
    name: 'Legacy',
    alt: 'Legacy',
    cards: 60,
    allowDupes: true,
    lifeTotal: 20
  },
  {
    name: 'Vintage',
    alt: 'Vintage',
    cards: 60,
    allowDupes: true,
    lifeTotal: 20
  },
  {
    name: 'Tiny Leaders',
    alt: 'Tiny EDH',
    cards: 50,
    allowDupes: false,
    lifeTotal: 30
  }
];

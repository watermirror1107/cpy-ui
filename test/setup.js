require('jsdom-global')(undefined, { url: 'https://localhost' });

global.localStorage = window.localStorage;

global.sessionStorage = window.sessionStorage;
window.Date = Date;

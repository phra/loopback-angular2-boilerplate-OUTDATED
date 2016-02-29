'use strict';
//import 'es6-shim';
//import 'reflect-metadata';
//import 'zone.js';
import {bootstrap} from 'angular2/platform/browser';
import {enableProdMode, provide, Inject} from 'angular2/core';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {TodoLocalStore} from './services/store';
import {Servizio} from './services/servizio';
import {Ajax} from './services/ajax';
import {App} from './components/app';
import {HTTP_PROVIDERS} from 'angular2/http';
import * as lbServices from './lib/lb-services';

if (ENVIRONMENT === 'production') {
  enableProdMode();
}

Object.defineProperty(lbServices, 'default', {
  enumerable: false
});

let loopback = [];

for (let a in lbServices) {
    loopback.push(lbServices[a]);
}

bootstrap(App, [
  TodoLocalStore,
  Servizio,
  Ajax,
  ...loopback,
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy })
]);

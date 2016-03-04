import 'ng2-material/dist/ng2-material.css!';
import 'assets/material-icons.css!';
import 'assets/app.css!';

import 'reflect-metadata';
import 'es6-shim';
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {TranslateService} from 'ng2-translate/ng2-translate';

import {AppComponent} from './app';
import * as lbServices from './lib/lb-services';

console.log(lbServices);
let lbServicesArray = [];
for (let key in lbServices) {
    lbServicesArray.push(lbServices[key]);
}

// noinspection TypeScriptValidateTypes
bootstrap(AppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS, TranslateService, ...lbServicesArray])
  .catch(err => console.error(err));

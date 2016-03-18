import 'bootstrap/css/bootstrap.css!';
import 'bootstrap/js/bootstrap';

import 'reflect-metadata';
import 'es6-shim';
import 'angular2/bundles/angular2-polyfills';

import {provide, Inject} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {TranslateLoader, TranslateStaticLoader, TranslateService} from 'ng2-translate/ng2-translate';

import {AppComponent} from './app';

// noinspection TypeScriptValidateTypes
bootstrap(AppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS, provide(TranslateLoader, {
    useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
        deps: [Http]
    }), TranslateService]
).catch(err => console.error(err));

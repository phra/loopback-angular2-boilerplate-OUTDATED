import {Component, Inject} from 'angular2/core';
import {Servizio} from '../services/servizio';
import CountTPL from './count.html';
import {HTTP_PROVIDERS} from 'angular2/http';
import {UserApi} from '../lib/lb-services';

@Component({
  selector: 'count',
  template: CountTPL,
  providers: [HTTP_PROVIDERS]
})

export class Count {
  _TEXT = 'COUNT';
  _servizio;
  _userApi;

  constructor(servizio : Servizio, userApi : UserApi) {
      this._servizio = servizio;
      this._userApi = userApi;
  }

  /*constructor(servizio : Servizio) {
    this._servizio = servizio;
  }*/

  get count() {
    return this._servizio.count;
  }

  get TEXT() {
    return this._TEXT;
  }

  dec() {
    this._servizio.dec();
  }

  ajax() {
    this._userApi.exists(1).subscribe(
      data => console.log(data),
      err => console.error(err),
      () => console.log('USERAPI SUCCESS')
    );
  }
}

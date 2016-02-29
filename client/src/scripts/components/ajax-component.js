import {Component} from 'angular2/core';
import ajaxTPL from './ajax-component.html';
import {Ajax} from '../services/ajax';
import {HTTP_PROVIDERS} from 'angular2/http';

@Component({
  selector: 'ajax-component',
  template: ajaxTPL,
  providers: [HTTP_PROVIDERS]
})

export class AjaxComponent {
  ajax;

  constructor(ajax : Ajax) {
    this.ajax = ajax;
  }

  getData() {
    this.ajax.getData();
  }
}

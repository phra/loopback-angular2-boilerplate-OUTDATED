import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {Login} from '../login/login';

@Component({
    selector: 'header',
    templateUrl: 'src/components/header/header.html',
    styleUrls: ['src/components/header/header.css'],
    directives: [ROUTER_DIRECTIVES, Login],
    pipes: [TranslatePipe]
})

export class Header {

  public loggedin(event: string): any {
    alert(event);
  }
}

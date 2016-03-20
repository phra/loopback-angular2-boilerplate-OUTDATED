import {Component} from 'angular2/core';
import {Items} from '../../components/items/items';

@Component({
  selector: 'home',
  templateUrl: 'src/views/home/home.html',
  styleUrls: ['src/views/home/home.css'],
  directives: [Items]
})
export class Home {
  constructor() {

  }
}

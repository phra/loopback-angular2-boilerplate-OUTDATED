import {Component} from 'angular2/core';

@Component({
  selector: 'about',
  templateUrl: 'src/views/about/about.html',
    styleUrls: ['src/views/about/about.css']
})
export class About {
  clickMessage = '';
  onClickMe(button: HTMLButtonElement) {
    this.clickMessage = `You have clicked ${button.name}!`;
  }
}

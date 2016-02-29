import {Http, Headers} from 'angular2/http';

export class Ajax {
  http;
  url;
  result = [];

  constructor(http : Http) {
    this.http = http;
    this.url = 'https://api.github.com/repos/vmg/redcarpet/issues?state=open';
  }

  getData() {
    this.http.get(this.url)
      //.map(data => data.json())
      .subscribe(
        data => this.result = data.json(),
        err => console.error(err),
        () => console.log('AJAX SUCCESS -> ', this.result)
      );
  }
}

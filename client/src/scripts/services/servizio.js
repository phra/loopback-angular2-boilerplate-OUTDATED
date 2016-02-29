export class Servizio {
  _count = 0;

  constructor() {
  }

  get count() {
    return this._count;
  }

  set count(c) {
    this._count = c;
  }

  inc() {
    this._count++;
  }

  dec() {
    this._count--;
  }
}

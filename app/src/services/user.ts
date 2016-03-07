import {Injectable} from 'angular2/core';

@Injectable()
export class User {
    private _user: any;

    constructor() {
    }

    set user(user: any) {
        this._user = user;
    }

    get user() {
        return this._user;
    }

    clearUser() {
        this._user = undefined;
    }
}

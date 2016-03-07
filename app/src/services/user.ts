import {Injectable} from 'angular2/core';

@Injectable()
export class User {
    public email: string;
    public password: string;
    constructor() {
    }
}

import {Component, Inject} from 'angular2/core';
import {User} from '../../services/user';

@Component({
    selector: 'login',
    templateUrl: 'src/components/login/login.html',
})
export class Login {
    public username: string;
    private password: string;

    constructor(@Inject(User) public user: User) {
        this.username = null;
        this.password = null;
    }

    login() {
        this.user.username = this.username;
        console.log('username', this.username);
        console.log('password', this.password);
        console.log('User', this.user);
    }
}

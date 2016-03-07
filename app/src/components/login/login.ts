import {Component, Inject} from 'angular2/core';
import {User} from '../../services/user';
import {UserApi} from '../../lib/lb-services';

@Component({
    selector: 'login',
    templateUrl: 'src/components/login/login.html',
})
export class Login {
    private email: string;
    private password: string;

    constructor(@Inject(User) public user: User, @Inject(UserApi) public userApi: UserApi) {
    }

    login() {
        this.user.email = this.email;
        this.user.password = this.password;
        console.log('UserApi', this.userApi);
        this.userApi.login(this.user).subscribe(
            (response: any) => console.log('login OK', response),
            (error: any) => console.error('login KO', error),
            () => console.log('login COMPLETE'));
    }
}

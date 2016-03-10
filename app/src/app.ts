import {Component} from 'angular2/core';
import {Router, Route, RouteConfig, ROUTER_DIRECTIVES, Location} from 'angular2/router';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';

import {Home} from './home/home';
import {About} from './about/about';
import {Login} from './components/login/login';

@Component({
    selector: 'my-app',
    providers: [],
    templateUrl: 'src/app.html',
    directives: [ROUTER_DIRECTIVES, Login],
    pipes: [TranslatePipe]
})
@RouteConfig([
    new Route({ path: '/home', component: Home, name: 'Home', useAsDefault: true}),
    new Route({ path: '/about', component: About, name: 'About'})
])
export class AppComponent {
    location: Location;
    currentPathStr = '';

    constructor(location: Location, router: Router, translate: TranslateService) {
        this.location = location;
        this.currentPathStr = '/home';
        router.subscribe((value) => this.currentPathStr = value);
        var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(fr|en)/gi.test(userLang) ? userLang : 'en';
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use(userLang);
    }

    clicked(message: string) {
        console.log(message);
    }

}

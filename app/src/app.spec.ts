import 'reflect-metadata';
import 'es6-shim';
import {AppComponent} from './app';
import {User} from './services/user';

describe('AppComponent component', () => {
  it('should be able to create', () => {
    let routerMock = {
      subscribe: function() {
      }
    };

    let translateMock = {
      useStaticFilesLoader() {},
      use() {},
      setDefaultLang() {}
    };

    let userApi = {
      isAuthenticated(): boolean { return false; },
      logout(): boolean { return true; }
    };

    let user = new User();

    var appComponent = new AppComponent(null, <any>routerMock, <any>translateMock, <any>userApi, user);
    expect(appComponent).toBeDefined();
  });
});

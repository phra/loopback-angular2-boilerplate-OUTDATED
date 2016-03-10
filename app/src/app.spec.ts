import 'reflect-metadata';
import 'es6-shim';
import {AppComponent} from './app';

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
    // noinspection TypeScriptValidateTypes
    var appComponent = new AppComponent(null, routerMock, translateMock);
    expect(appComponent).toBeDefined();
  });
});

import 'reflect-metadata';
import {About} from './about';

describe('HomeComponent component', () => {
  it('should be able to create and onClickMe method', () => {
    let aboutComponent: About = new About();
    expect(aboutComponent).toBeDefined();
  });
  it('should be able to invoke onClickMe method', () => {
    let aboutComponent: About = new About();
    let button: any = {
      name: 'TEST'
    };
    expect(aboutComponent).toBeDefined();
    expect(aboutComponent.clickMessage).toEqual('');
    aboutComponent.onClickMe(<any> button);
    expect(aboutComponent.clickMessage).toEqual('You have clicked TEST!');
  });
});

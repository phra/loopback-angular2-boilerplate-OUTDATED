import {Component, Inject} from 'angular2/core';
import {ItemApi} from '../../lib/lb-services';

@Component({
    selector: 'items',
    templateUrl: 'src/components/items/items.html',
    styleUrls: ['src/components/items/items.css']
})
export class Items {
    protected items: any[] = [];
    protected text: string = '';

    constructor(private itemApi: ItemApi) {
    }

    getItems() {
        this.itemApi.find().subscribe(
            (response: any) => { this.items = response, this.text = ''; },
            (error: Error) => { this.items = [], this.text = error.message; },
            () => {}
        );
    }

}

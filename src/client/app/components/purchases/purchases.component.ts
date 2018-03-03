import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-purchases',
    templateUrl: './purchases.component.html',
    styleUrls: ['./purchases.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PurchasesComponent {
    constructor(private router: Router) {}

    onSelectHome({selected}) {
        this.router.navigate(['home/']);
    }

    onSelectExpenses({selected}) {
        this.router.navigate(['expenses/']);
    }

    onSelectPurchases({selected}) {
        this.router.navigate(['purchases/']);
    }

    onSelectSuggestions({selected}) {
        this.router.navigate(['suggestions/']);
    }
}

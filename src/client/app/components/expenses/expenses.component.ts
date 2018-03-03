import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-expenses',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ExpensesComponent {
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

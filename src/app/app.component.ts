import { LoadingValue, beginLoading } from './load-status';
import { SquareOpService } from './async-ops/square-op.service';
import { ClickCounter } from './click-counter/click-counter';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, flatMap } from 'rxjs/operators';

@Component({
    selector: 'app-component',
    styleUrls: ['./app.component.css'],
    templateUrl: './app.component.html',
})
export class AppComponent {

    clickCounter$: Observable<number>;
    squareOpSync$: Observable<number>;

    squareOpAsyncFlat$: Observable<LoadingValue<number>>;
    squareOpAsyncSwitch$: Observable<LoadingValue<number>>;

    constructor(
        protected readonly clickCounter: ClickCounter,
        protected readonly squareOpService: SquareOpService
    ) {
        // Basic take an observable modified by the user (like new versions of business objects) and reflect them
        this.clickCounter$ = clickCounter.counter$;

        // Perform a synchronous operation on the data that was modified (like counting the number of items in the cart)
        this.squareOpSync$ = clickCounter.counter$.pipe(
            map(n => n ** 2)
        );

        // Perform an async operation on the data (like recalculating availability)
        this.squareOpAsyncFlat$ = clickCounter.counter$.pipe(
            flatMap(n => beginLoading(this.squareOpService.computeSquareOf(n)))
        );
        this.squareOpAsyncSwitch$ = clickCounter.counter$.pipe(
            switchMap(n => beginLoading(this.squareOpService.computeSquareOf(n)))
        );
    }

    onButtonClick() {
        this.clickCounter.increment();
    }
}

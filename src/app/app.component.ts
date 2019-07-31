import { AddOpService } from './async-ops/add-op.service';
import { LoadingValue, beginLoading, isLoaded, LoadStatus, LoadingStatus } from './load-wrapper';
import { SquareOpService } from './async-ops/square-op.service';
import { ClickCounter } from './click-counter/click-counter';
import { Component } from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';
import { map, switchMap, flatMap, concatMap, exhaustMap, reduce, scan, mergeScan } from 'rxjs/operators';
import { NumberSourceOpService } from './async-ops/number-source-op.service';

@Component({
    selector: 'app-component',
    styleUrls: ['./app.component.css'],
    templateUrl: './app.component.html',
})
export class AppComponent {
    readonly showTheBadStuff = false;

    clickCounter$: Observable<number>;
    squareOpSync$: Observable<number>;

    squareOpAsyncFlat$: Observable<LoadingValue<number>>;
    squareOpAsyncConcat$: Observable<LoadingValue<number>>;
    squareOpAsyncExhaust$: Observable<LoadingValue<number>>;
    squareOpAsyncSwitch$: Observable<LoadingValue<number>>;

    multiOp$: Observable<LoadingValue<LoadingValue<number>[]>>;

    totalSum$: Observable<number>;
    totalSumAsync$: Observable<LoadingValue<number>>;
    numberList$: Observable<number[]>;

    constructor(
        protected readonly clickCounter: ClickCounter,
        protected readonly squareOpService: SquareOpService,
        protected readonly addOpService: AddOpService,
        protected readonly numberSourceService: NumberSourceOpService,
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
        this.squareOpAsyncConcat$ = clickCounter.counter$.pipe(
            concatMap(n => beginLoading(this.squareOpService.computeSquareOf(n)))
        );
        this.squareOpAsyncExhaust$ = clickCounter.counter$.pipe(
            exhaustMap(n => beginLoading(this.squareOpService.computeSquareOf(n)))
        );
        this.squareOpAsyncSwitch$ = clickCounter.counter$.pipe(
            switchMap(n => beginLoading(this.squareOpService.computeSquareOf(n)))
        );

        this.numberList$ = clickCounter.counter$.pipe(
            scan<number>((acc, n) => [...acc, n], [])
        );

        this.totalSum$ = clickCounter.counter$.pipe(
            scan((acc, n) => acc + n, 0)
        );

        // These last two might be too complicated?
        this.totalSumAsync$ = clickCounter.counter$.pipe(
            mergeScan((acc: LoadingValue<number>, n) => this.loadingSumAccumulator(acc, n), LoadStatus(LoadingStatus.Loaded, 0), 1)
        );

        // Perform an async operation using async data
        this.multiOp$ = clickCounter.counter$.pipe(
            switchMap(n => beginLoading(this.addFromNumberSource(n)))
        );
    }

    onButtonClick() {
        this.clickCounter.increment();
    }

    addFromNumberSource(counter: number): Observable<LoadingValue<number>[]> {
        return this.numberSourceService.getSomeNumbers().pipe(
            flatMap(numbers => combineLatest(numbers.map(n => beginLoading(this.addOpService.computeSumOf(counter, n)))))
        );
    }

    loadingSumAccumulator(acc: LoadingValue<number>, n: number) {
        if (!isLoaded(acc)) {
            return of(acc);
        }
        return beginLoading(this.addOpService.computeSumOf(acc.value, n));
    }
}

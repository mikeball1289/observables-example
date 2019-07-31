import { ClickCounter } from './../click-counter/click-counter';
import { Component, OnInit } from '@angular/core';
import { first, flatMap, map, tap } from 'rxjs/operators';
import { NumberSourceOpService } from '../async-ops/number-source-op.service';

@Component({
    selector: 'app-terrible',
    templateUrl: './terrible.component.html'
})
export class TerribleComponent implements OnInit {

    numberValue: number;
    sumNumbers: number[];
    loading = false;

    constructor(
        private readonly clickCounter: ClickCounter,
        private readonly numberSourceService: NumberSourceOpService
    ) { }

    ngOnInit(): void {
        this.clickCounter.counter$.pipe(
            first(),
        ).subscribe(n => {
            this.numberValue = n;
        });
    }

    onUpdateClicked() {
        this.clickCounter.counter$.pipe(
            first(),
            flatMap(n => {
                this.loading = true;
                this.numberValue = n;
                return this.numberSourceService.getSomeNumbers().pipe(
                    tap(numbers => {
                        this.sumNumbers = numbers.map(num => num + this.numberValue);
                    })
                );
            })
        ).subscribe(
            () => this.loading = false,
            () => this.loading = false,
            () => this.loading = false
        );
    }
}

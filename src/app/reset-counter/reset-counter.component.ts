import { ClickCounter } from './../click-counter/click-counter';
import { Component } from '@angular/core';

@Component({
    selector: 'app-reset-counter',
    styleUrls: ['./reset-counter.component.css'],
    templateUrl: './reset-counter.component.html',
})
export class ResetCounterComponent {

    constructor(protected readonly clickCounter: ClickCounter) {}

    onResetClick() {
        this.clickCounter.reset();
    }

}

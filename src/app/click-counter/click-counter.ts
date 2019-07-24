import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ClickCounter {
    counter$: Observable<number>;
    private counterSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    constructor() {
        this.counter$ = this.counterSubject;
    }

    increment() {
        this.counterSubject.next(this.counterSubject.getValue() + 1);
    }

    reset() {
        this.counterSubject.next(0);
    }
}

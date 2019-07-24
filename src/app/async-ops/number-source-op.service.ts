import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class NumberSourceOpService {

    public getSomeNumbers() {
        return of<[number, number, number]>([1, 2, 3]).pipe(
            delay(1000)
        );
    }

}

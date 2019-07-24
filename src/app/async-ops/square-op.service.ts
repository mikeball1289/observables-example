import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay, tap, share } from 'rxjs/operators';

@Injectable()
export class SquareOpService {

    public computeSquareOf(n: number) {
        return of(n ** 2).pipe(
            delay(1000),
            tap(() => {
                if (n !== 0 && n % 10 === 0) {
                    throw new Error('API failure');
                }
            }),
            share()
        );
    }

}

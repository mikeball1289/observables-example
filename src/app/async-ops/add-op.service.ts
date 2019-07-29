import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay, share } from 'rxjs/operators';

@Injectable()
export class AddOpService {

    public computeSumOf(x: number, y: number) {
        return of(x + y).pipe(
            delay(Math.random() * 1000 + 500),
            share()
        );
    }

}

import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class AddOpService {

    public computeSumOf(x: number, y: number) {
        return of(x + y).pipe(
            delay(1000)
        );
    }

}

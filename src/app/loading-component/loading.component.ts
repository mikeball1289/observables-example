import { LoadingStatus } from './../load-wrapper';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-loading-component',
    styleUrls: ['./loading.component.css'],
    templateUrl: './loading.component.html'

})
export class LoadingComponent<T> {
    @Input() value: T;
    @Input() loadingStatus: LoadingStatus;
}

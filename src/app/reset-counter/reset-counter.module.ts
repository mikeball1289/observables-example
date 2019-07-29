import { ClickCounterModule } from '../click-counter';
import { NgModule } from '@angular/core';
import { ResetCounterComponent } from './reset-counter.component';

@NgModule({
    declarations: [ResetCounterComponent],
    exports: [ResetCounterComponent],
    imports: [
        ClickCounterModule
    ]
})
export class ResetCounterModule {}

import { CommonModule } from '@angular/common';
import { AsyncOpsModule } from './../async-ops/async-ops.module';
import { ClickCounterModule } from './../click-counter/click-counter.module';
import { NgModule } from '@angular/core';
import { TerribleComponent } from './terrible.component';

@NgModule({
    declarations: [TerribleComponent],
    exports: [TerribleComponent],
    imports: [
        CommonModule,
        ClickCounterModule,
        AsyncOpsModule
    ]
})
export class TerribleModule {}

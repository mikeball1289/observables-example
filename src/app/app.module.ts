import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { LoadingModule } from './loading-component';
import { ClickCounterModule } from './click-counter';
import { AsyncOpsModule } from './async-ops';
import { ResetCounterModule } from './reset-counter/reset-counter.module';
import { TerribleModule } from './terrible';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [
        CoreModule,
        CommonModule,
        ClickCounterModule,
        AsyncOpsModule,
        LoadingModule,
        ResetCounterModule,
        TerribleModule
    ],
})
export class AppModule {}

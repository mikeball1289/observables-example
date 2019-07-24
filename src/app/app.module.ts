import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { ClickCounterModule } from './click-counter';
import { CommonModule } from '@angular/common';
import { AsyncOpsModule } from './async-ops';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [
        CoreModule,
        CommonModule,
        ClickCounterModule,
        AsyncOpsModule
    ],
})
export class AppModule {}

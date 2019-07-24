import { NumberSourceOpService } from './number-source-op.service';
import { AddOpService } from './add-op.service';
import { NgModule } from '@angular/core';
import { SquareOpService } from './square-op.service';

@NgModule({
  providers: [
      AddOpService,
      SquareOpService,
      NumberSourceOpService
    ]
})
export class AsyncOpsModule {}

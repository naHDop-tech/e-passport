import { Module } from '@nestjs/common';

import { DateCalculatorService } from '~/utils/date-calculator.service';

@Module({
  providers: [DateCalculatorService],
  exports: [DateCalculatorService],
})
export class UtilsModule {}

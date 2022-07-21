import { Module } from '@nestjs/common';

import { DateCalculatorService } from '~/utils/date-calculator.service';
import { CryptoService } from '~/utils/crypto.service';

@Module({
  providers: [DateCalculatorService, CryptoService],
  exports: [DateCalculatorService, CryptoService],
})
export class UtilsModule {}

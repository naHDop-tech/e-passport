import { Module } from '@nestjs/common';

import { DateCalculatorService } from '~/utils/date-calculator.service';
import { CryptoService } from '~/utils/crypto.service';
import { PassportUtilsService } from '~/utils/passport-utils.service';

@Module({
  providers: [DateCalculatorService, CryptoService, PassportUtilsService],
  exports: [DateCalculatorService, CryptoService, PassportUtilsService],
})
export class UtilsModule {}

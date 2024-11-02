import { Module } from '@nestjs/common';
import { CsLoggerService } from './cs-logger.service';

@Module({
    providers: [CsLoggerService],
    exports: [CsLoggerService]
})
export class CsLoggerModule {}

import { Global, Module } from '@nestjs/common';
import { PrismaMGService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaMGService],
  exports: [PrismaMGService],
})
export class PrismaModule {}

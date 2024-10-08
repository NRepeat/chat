import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'prisma/generated/client1';
// import { PrismaClient } from 'prisma/generated/client2';

@Injectable()
export class PrismaMGService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
// @Injectable()
// export class PrismaPGService extends PrismaClient implements OnModuleInit {
//   async onModuleInit() {
//     await this.$connect();
//   }
// }

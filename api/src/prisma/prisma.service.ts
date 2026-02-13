import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import { envConfig } from '../config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const connStr = envConfig.DATABASE_URL;
    const adapter = new PrismaPg({ connectionString: connStr });
    super({ adapter });
  }
}

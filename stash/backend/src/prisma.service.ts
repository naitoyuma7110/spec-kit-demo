import { Injectable, OnModuleInit, INestApplication } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	async onModuleInit() {
		await this.$connect();
	}

	// Prisma v5.xではbeforeExitフックは非推奨
	async enableShutdownHooks(app: INestApplication) {
		// 何もせず空実装
	}
}

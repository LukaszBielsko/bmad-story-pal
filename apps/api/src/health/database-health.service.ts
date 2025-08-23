import { Injectable, Inject, Logger } from '@nestjs/common';
import { sql } from 'drizzle-orm';

export interface DatabaseHealthResult {
  isHealthy: boolean;
  responseTime: string;
  error?: string;
}

@Injectable()
export class DatabaseHealthService {
  private readonly logger = new Logger(DatabaseHealthService.name);

  constructor(@Inject('DATABASE') private readonly db: any) {}

  async checkDatabase(): Promise<DatabaseHealthResult> {
    try {
      const startTime = Date.now();
      await this.db.execute(sql`SELECT 1`);
      const responseTime = Date.now() - startTime;
      
      this.logger.log(`Database health check passed in ${responseTime}ms`);
      
      return {
        isHealthy: true,
        responseTime: `${responseTime}ms`,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Database health check failed: ${errorMessage}`);
      
      return {
        isHealthy: false,
        responseTime: 'N/A',
        error: errorMessage,
      };
    }
  }
}
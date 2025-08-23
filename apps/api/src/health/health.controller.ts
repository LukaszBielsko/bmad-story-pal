import { Controller, Get } from '@nestjs/common';
import { DatabaseHealthService } from './database-health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly databaseHealth: DatabaseHealthService) {}

  @Get()
  async check() {
    const startTime = Date.now();
    const databaseStatus = await this.databaseHealth.checkDatabase();
    
    return {
      status: databaseStatus.isHealthy ? 'ok' : 'error',
      info: {
        database: {
          status: databaseStatus.isHealthy ? 'up' : 'down',
          responseTime: databaseStatus.responseTime,
        },
      },
      error: databaseStatus.isHealthy ? {} : {
        database: {
          status: 'down',
          message: databaseStatus.error,
        },
      },
      details: {
        database: {
          status: databaseStatus.isHealthy ? 'up' : 'down',
          responseTime: databaseStatus.responseTime,
        },
      },
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
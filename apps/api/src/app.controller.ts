import { Controller, Get } from '@nestjs/common';
import { DatabaseHealthService } from './health/database-health.service';

@Controller()
export class AppController {
  constructor(private readonly databaseHealth: DatabaseHealthService) {}

  @Get()
  getHello(): string {
    return 'StoryMagic API is running! 🚀';
  }

  @Get('health')
  async getHealthCheck() {
    const databaseStatus = await this.databaseHealth.checkDatabase();
    
    return {
      status: databaseStatus.isHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      services: {
        api: 'healthy',
        database: databaseStatus.isHealthy ? 'healthy' : 'unhealthy',
        // redis: 'not_configured',     // TODO: Add when Redis is configured
        // openai: 'not_configured',    // TODO: Add when OpenAI is configured
      },
      database: {
        status: databaseStatus.isHealthy ? 'up' : 'down',
        responseTime: databaseStatus.responseTime,
        error: databaseStatus.error,
      },
      message: 'Database architecture refactoring complete!',
    };
  }

  @Get('ping')
  getPing() {
    return { message: 'pong', timestamp: new Date().toISOString() };
  }
}
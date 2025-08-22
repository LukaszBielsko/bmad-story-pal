import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'StoryMagic API is running! 🚀';
  }

  @Get('health')
  getHealthCheck() {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      services: {
        api: 'healthy',
        // database: 'not_configured', // TODO: Add when DB is configured
        // redis: 'not_configured',     // TODO: Add when Redis is configured
        // openai: 'not_configured',    // TODO: Add when OpenAI is configured
      },
      message: 'Project setup complete - ready for development!',
    };
  }

  @Get('ping')
  getPing() {
    return { message: 'pong', timestamp: new Date().toISOString() };
  }
}
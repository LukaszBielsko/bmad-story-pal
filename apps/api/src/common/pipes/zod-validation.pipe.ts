import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

/**
 * NestJS validation pipe using Zod schemas
 * 
 * Usage example:
 * ```typescript
 * @Post()
 * async createUser(
 *   @Body(new ZodValidationPipe(createUserSchema)) userData: CreateUserRequest
 * ) {
 *   return this.userService.create(userData);
 * }
 * ```
 */
@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any) {
    try {
      // Parse and validate the incoming data
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      if (error instanceof ZodError) {
        // Transform Zod errors into user-friendly format
        const errorMessages = error.errors.map(
          (err) => `${err.path.join('.')}: ${err.message}`
        );
        
        throw new BadRequestException({
          error: 'VALIDATION_ERROR',
          message: 'Request validation failed',
          details: errorMessages,
          statusCode: 400,
        });
      }
      
      // Handle non-Zod errors
      throw new BadRequestException('Validation failed');
    }
  }
}
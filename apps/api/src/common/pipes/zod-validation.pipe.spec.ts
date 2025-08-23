import { BadRequestException } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from './zod-validation.pipe';

describe('ZodValidationPipe', () => {
  const testSchema = z.object({
    name: z.string().min(2).max(50),
    age: z.number().int().min(0).max(120),
    email: z.string().email(),
  });

  let pipe: ZodValidationPipe;

  beforeEach(() => {
    pipe = new ZodValidationPipe(testSchema);
  });

  describe('transform', () => {
    it('should pass valid data through unchanged', () => {
      const validData = {
        name: 'John Doe',
        age: 30,
        email: 'john@example.com',
      };

      const result = pipe.transform(validData);

      expect(result).toEqual(validData);
    });

    it('should throw BadRequestException for invalid string length', () => {
      const invalidData = {
        name: 'J', // Too short
        age: 30,
        email: 'john@example.com',
      };

      expect(() => pipe.transform(invalidData)).toThrow(BadRequestException);
    });

    it('should throw BadRequestException for invalid email format', () => {
      const invalidData = {
        name: 'John Doe',
        age: 30,
        email: 'not-an-email', // Invalid email
      };

      expect(() => pipe.transform(invalidData)).toThrow(BadRequestException);
    });

    it('should throw BadRequestException for missing required field', () => {
      const invalidData = {
        name: 'John Doe',
        // Missing age and email
      };

      expect(() => pipe.transform(invalidData)).toThrow(BadRequestException);
    });

    it('should provide detailed error messages', () => {
      const invalidData = {
        name: 'J', // Too short
        age: -5, // Negative
        email: 'invalid-email', // Invalid format
      };

      try {
        pipe.transform(invalidData);
        fail('Expected BadRequestException to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        
        const response = error.getResponse();
        expect(response).toHaveProperty('error', 'VALIDATION_ERROR');
        expect(response).toHaveProperty('message', 'Request validation failed');
        expect(response).toHaveProperty('details');
        expect(Array.isArray(response.details)).toBe(true);
        expect(response.details.length).toBeGreaterThan(0);
      }
    });

    it('should handle nested object validation errors', () => {
      const nestedSchema = z.object({
        user: z.object({
          profile: z.object({
            name: z.string().min(2),
          }),
        }),
      });

      const nestedPipe = new ZodValidationPipe(nestedSchema);
      const invalidData = {
        user: {
          profile: {
            name: 'A', // Too short
          },
        },
      };

      try {
        nestedPipe.transform(invalidData);
        fail('Expected BadRequestException to be thrown');
      } catch (error) {
        const response = error.getResponse();
        expect(response.details).toEqual(
          expect.arrayContaining([
            expect.stringContaining('user.profile.name:')
          ])
        );
      }
    });

    it('should handle array validation errors', () => {
      const arraySchema = z.object({
        tags: z.array(z.string().min(1)),
      });

      const arrayPipe = new ZodValidationPipe(arraySchema);
      const invalidData = {
        tags: ['valid', '', 'another-valid'], // Empty string in array
      };

      try {
        arrayPipe.transform(invalidData);
        fail('Expected BadRequestException to be thrown');
      } catch (error) {
        const response = error.getResponse();
        expect(response.details).toEqual(
          expect.arrayContaining([
            expect.stringContaining('tags.1:')
          ])
        );
      }
    });

    it('should handle non-ZodError exceptions gracefully', () => {
      // Create a spy that throws a non-ZodError
      const spyPipe = new ZodValidationPipe(testSchema);
      jest.spyOn(testSchema, 'parse').mockImplementation(() => {
        throw new Error('Non-Zod error');
      });

      expect(() => spyPipe.transform({})).toThrow(
        new BadRequestException('Validation failed')
      );
    });

    it('should transform and coerce data types when possible', () => {
      const coercionSchema = z.object({
        age: z.coerce.number().int(),
        isActive: z.coerce.boolean(),
      });

      const coercionPipe = new ZodValidationPipe(coercionSchema);
      const inputData = {
        age: '25', // String that should be coerced to number
        isActive: 'true', // String that should be coerced to boolean
      };

      const result = coercionPipe.transform(inputData);

      expect(result).toEqual({
        age: 25,
        isActive: true,
      });
    });
  });
});
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { FirebaseAuthGuard } from './firebase-auth.guard';
import { FirebaseService } from '../services/firebase.service';

describe('FirebaseAuthGuard', () => {
  let guard: FirebaseAuthGuard;
  let firebaseService: jest.Mocked<FirebaseService>;
  let configService: jest.Mocked<ConfigService>;
  let mockExecutionContext: jest.Mocked<ExecutionContext>;
  let mockRequest: any;

  beforeEach(async () => {
    const mockFirebaseService = {
      verifyIdToken: jest.fn(),
      createMockUser: jest.fn(),
    };

    const mockConfigService = {
      get: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        FirebaseAuthGuard,
        {
          provide: FirebaseService,
          useValue: mockFirebaseService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    guard = module.get<FirebaseAuthGuard>(FirebaseAuthGuard);
    firebaseService = module.get(FirebaseService);
    configService = module.get(ConfigService);

    // Mock execution context
    mockRequest = {
      headers: {},
      user: undefined,
    };

    mockExecutionContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest),
      }),
    } as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Mock Authentication Mode', () => {
    beforeEach(() => {
      configService.get.mockReturnValue(true); // app.mockAuth=true
    });

    it('should bypass Firebase validation in mock mode', async () => {
      const mockUser = {
        uid: 'mock-user-123',
        email: 'demo@storymagic.app',
        name: 'Demo User',
      };

      firebaseService.createMockUser.mockReturnValue(mockUser as any);

      const result = await guard.canActivate(mockExecutionContext);

      expect(result).toBe(true);
      expect(mockRequest.user).toEqual(mockUser);
      expect(firebaseService.createMockUser).toHaveBeenCalled();
      expect(firebaseService.verifyIdToken).not.toHaveBeenCalled();
    });

    it('should not require authorization header in mock mode', async () => {
      const mockUser = { uid: 'mock-user-123' };
      firebaseService.createMockUser.mockReturnValue(mockUser as any);

      // No authorization header set
      mockRequest.headers = {};

      const result = await guard.canActivate(mockExecutionContext);

      expect(result).toBe(true);
      expect(mockRequest.user).toEqual(mockUser);
    });
  });

  describe('Production Authentication Mode', () => {
    beforeEach(() => {
      configService.get.mockReturnValue(false); // app.mockAuth=false
    });

    it('should validate Firebase token successfully', async () => {
      const validToken = 'valid.firebase.token';
      const decodedToken = {
        uid: 'firebase-user-123',
        email: 'user@example.com',
        email_verified: true,
      };

      mockRequest.headers.authorization = `Bearer ${validToken}`;
      firebaseService.verifyIdToken.mockResolvedValue(decodedToken as any);

      const result = await guard.canActivate(mockExecutionContext);

      expect(result).toBe(true);
      expect(mockRequest.user).toEqual(decodedToken);
      expect(firebaseService.verifyIdToken).toHaveBeenCalledWith(validToken);
    });

    it('should throw UnauthorizedException when no authorization header', async () => {
      mockRequest.headers = {}; // No authorization header

      await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
        UnauthorizedException
      );
      await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
        'No valid authorization header found'
      );
    });

    it('should throw UnauthorizedException when authorization header malformed', async () => {
      mockRequest.headers.authorization = 'InvalidHeader token';

      await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
        UnauthorizedException
      );
    });

    it('should throw UnauthorizedException when no token provided', async () => {
      mockRequest.headers.authorization = 'Bearer '; // Empty token

      await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
        UnauthorizedException
      );
      await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
        'No token provided'
      );
    });

    it('should throw UnauthorizedException when Firebase verification fails', async () => {
      const invalidToken = 'invalid.firebase.token';
      mockRequest.headers.authorization = `Bearer ${invalidToken}`;

      firebaseService.verifyIdToken.mockRejectedValue(
        new Error('Token verification failed')
      );

      await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
        UnauthorizedException
      );
      await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
        'Authentication failed'
      );
    });

    it('should preserve UnauthorizedException from Firebase service', async () => {
      const invalidToken = 'invalid.firebase.token';
      mockRequest.headers.authorization = `Bearer ${invalidToken}`;

      const originalError = new UnauthorizedException('Invalid token format');
      firebaseService.verifyIdToken.mockRejectedValue(originalError);

      await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
        originalError
      );
    });

    it('should extract token correctly from Bearer authorization header', async () => {
      const token = 'test.firebase.token';
      const decodedToken = { uid: 'test-user', email: 'test@example.com' };

      mockRequest.headers.authorization = `Bearer ${token}`;
      firebaseService.verifyIdToken.mockResolvedValue(decodedToken as any);

      await guard.canActivate(mockExecutionContext);

      expect(firebaseService.verifyIdToken).toHaveBeenCalledWith(token);
    });

    it('should not call createMockUser in production mode', async () => {
      const token = 'valid.firebase.token';
      const decodedToken = { uid: 'user-123', email: 'user@example.com' };

      mockRequest.headers.authorization = `Bearer ${token}`;
      firebaseService.verifyIdToken.mockResolvedValue(decodedToken as any);

      await guard.canActivate(mockExecutionContext);

      expect(firebaseService.createMockUser).not.toHaveBeenCalled();
    });
  });

  describe('Environment Configuration', () => {
    it('should check app.mockAuth configuration', async () => {
      configService.get.mockReturnValue(true);
      firebaseService.createMockUser.mockReturnValue({ uid: 'mock' } as any);

      await guard.canActivate(mockExecutionContext);

      expect(configService.get).toHaveBeenCalledWith('app.mockAuth');
    });

    it('should treat non-"true" values as production mode', async () => {
      const token = 'firebase.token';
      const decodedToken = { uid: 'user-123' };

      mockRequest.headers.authorization = `Bearer ${token}`;
      configService.get.mockReturnValue(false); // Explicitly false
      firebaseService.verifyIdToken.mockResolvedValue(decodedToken as any);

      await guard.canActivate(mockExecutionContext);

      expect(firebaseService.verifyIdToken).toHaveBeenCalled();
      expect(firebaseService.createMockUser).not.toHaveBeenCalled();
    });

    it('should treat undefined app.mockAuth as production mode', async () => {
      const token = 'firebase.token';
      const decodedToken = { uid: 'user-123' };

      mockRequest.headers.authorization = `Bearer ${token}`;
      configService.get.mockReturnValue(undefined); // Undefined value
      firebaseService.verifyIdToken.mockResolvedValue(decodedToken as any);

      await guard.canActivate(mockExecutionContext);

      expect(firebaseService.verifyIdToken).toHaveBeenCalled();
      expect(firebaseService.createMockUser).not.toHaveBeenCalled();
    });
  });
});
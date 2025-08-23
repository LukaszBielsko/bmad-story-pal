import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseService } from '../services/firebase.service';

/**
 * Firebase Authentication Guard with Mock Bypass Support
 * 
 * When MOCK_AUTH=true (development/demo mode):
 * - Bypasses Firebase token verification
 * - Injects mock user into request context
 * 
 * When MOCK_AUTH=false (production mode):
 * - Validates Firebase ID tokens
 * - Extracts user information from token
 */
@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  private readonly logger = new Logger(FirebaseAuthGuard.name);

  constructor(
    private firebaseService: FirebaseService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // Check if mock authentication is enabled
    const mockAuth = this.configService.get<boolean>('app.mockAuth');
    
    if (mockAuth) {
      // Mock authentication mode - bypass Firebase validation
      const mockUser = this.firebaseService.createMockUser();
      request.user = mockUser;
      
      this.logger.debug('Mock authentication bypassed - demo mode active');
      return true;
    }

    // Production authentication mode - validate Firebase token
    try {
      const authHeader = request.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('No valid authorization header found');
      }

      const idToken = authHeader.substring(7); // Remove 'Bearer ' prefix
      
      if (!idToken) {
        throw new UnauthorizedException('No token provided');
      }

      // Verify the Firebase ID token
      const decodedToken = await this.firebaseService.verifyIdToken(idToken);
      
      // Attach user info to request for use in controllers/services
      request.user = decodedToken;
      
      this.logger.debug(`User authenticated: ${decodedToken.uid}`);
      
      return true;
    } catch (error) {
      this.logger.warn('Authentication failed:', error.message);
      
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      
      throw new UnauthorizedException('Authentication failed');
    }
  }
}
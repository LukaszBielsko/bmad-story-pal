import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

export interface DecodedFirebaseToken {
  uid: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  picture?: string;
  firebase: {
    sign_in_provider: string;
    identities: Record<string, any>;
  };
  iat: number;
  exp: number;
}

/**
 * Firebase Admin SDK service for token verification and user management
 * Supports mock authentication bypass for development/demo mode
 */
@Injectable()
export class FirebaseService {
  private readonly logger = new Logger(FirebaseService.name);
  private app: admin.app.App;

  constructor(private configService: ConfigService) {
    this.initializeFirebaseApp();
  }

  private initializeFirebaseApp(): void {
    const firebaseConfig = this.configService.get('firebase');
    
    if (!firebaseConfig?.projectId) {
      this.logger.warn('Firebase configuration missing, some features may not work');
      return;
    }

    try {
      // Check if Firebase app is already initialized
      if (admin.apps.length === 0) {
        this.app = admin.initializeApp({
          credential: admin.credential.cert({
            projectId: firebaseConfig.projectId,
            privateKey: firebaseConfig.privateKey,
            clientEmail: firebaseConfig.clientEmail,
          }),
          projectId: firebaseConfig.projectId,
        });
        
        this.logger.log('Firebase Admin SDK initialized successfully');
      } else {
        this.app = admin.apps[0] as admin.app.App;
        this.logger.log('Using existing Firebase Admin SDK instance');
      }
    } catch (error) {
      this.logger.error('Failed to initialize Firebase Admin SDK:', error.message);
    }
  }

  /**
   * Verify Firebase ID token
   * @param idToken - Firebase ID token from client
   * @returns Decoded token information
   */
  async verifyIdToken(idToken: string): Promise<DecodedFirebaseToken> {
    try {
      if (!this.app) {
        throw new UnauthorizedException('Firebase not initialized');
      }

      const decodedToken = await admin.auth(this.app).verifyIdToken(idToken);
      
      this.logger.debug(`Token verified for user: ${decodedToken.uid}`);
      
      return decodedToken as DecodedFirebaseToken;
    } catch (error) {
      this.logger.warn('Token verification failed:', error.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  /**
   * Get user information from Firebase Auth
   * @param uid - Firebase user UID
   * @returns Firebase user record
   */
  async getUserByUid(uid: string): Promise<admin.auth.UserRecord> {
    try {
      if (!this.app) {
        throw new Error('Firebase not initialized');
      }

      const userRecord = await admin.auth(this.app).getUser(uid);
      return userRecord;
    } catch (error) {
      this.logger.warn(`Failed to get user ${uid}:`, error.message);
      throw error;
    }
  }

  /**
   * Create a mock user for development/demo mode
   * Used when MOCK_AUTH=true
   */
  createMockUser(): DecodedFirebaseToken {
    const mockUser: DecodedFirebaseToken = {
      uid: 'mock-user-123',
      email: 'demo@storymagic.app',
      email_verified: true,
      name: 'Demo User',
      picture: undefined,
      firebase: {
        sign_in_provider: 'mock',
        identities: {
          email: ['demo@storymagic.app'],
        },
      },
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
    };

    this.logger.debug('Created mock user for demo mode');
    return mockUser;
  }

  /**
   * Check if Firebase is properly initialized
   */
  isInitialized(): boolean {
    return !!this.app;
  }

  /**
   * Get Firebase app instance (for advanced usage)
   */
  getApp(): admin.app.App {
    return this.app;
  }
}
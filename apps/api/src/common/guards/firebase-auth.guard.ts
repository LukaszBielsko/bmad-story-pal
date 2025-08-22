import { Injectable, CanActivate } from '@nestjs/common';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  canActivate(): boolean {
    // TODO: Implement Firebase JWT validation
    return true; // Allow all for development setup
  }
}
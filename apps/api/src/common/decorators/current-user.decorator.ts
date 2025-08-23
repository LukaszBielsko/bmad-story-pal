import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DecodedFirebaseToken } from '../services/firebase.service';

/**
 * Custom decorator to extract the current authenticated user from the request
 * 
 * Usage in controllers:
 * ```typescript
 * @Get('profile')
 * @UseGuards(FirebaseAuthGuard)
 * async getProfile(@CurrentUser() user: DecodedFirebaseToken) {
 *   return this.userService.getProfile(user.uid);
 * }
 * ```
 */
export const CurrentUser = createParamDecorator(
  (data: keyof DecodedFirebaseToken | undefined, ctx: ExecutionContext): DecodedFirebaseToken | any => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as DecodedFirebaseToken;

    // If a specific property is requested, return only that property
    if (data && user) {
      return user[data];
    }

    // Return the entire user object
    return user;
  },
);
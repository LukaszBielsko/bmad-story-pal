import { Module } from '@nestjs/common';

// Controllers
import { UsersController } from './controllers/users.controller';

// Services
import { UsersService } from './services/users.service';
import { FirebaseService } from '../common/services/firebase.service';

// Guards
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    FirebaseService,
    FirebaseAuthGuard,
  ],
  exports: [
    UsersService,
    FirebaseService,
    FirebaseAuthGuard,
  ],
})
export class UserManagementModule {}
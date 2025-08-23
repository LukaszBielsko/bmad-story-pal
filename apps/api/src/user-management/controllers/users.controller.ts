import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

// Guards and decorators
import { FirebaseAuthGuard } from '../../common/guards/firebase-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';

// Services
import { UsersService } from '../services/users.service';

// Schemas and types
import {
  createUserSchema,
  updateUserProfileSchema,
  updateUserPreferencesSchema,
  getUsersQuerySchema,
  userIdParamSchema,
  type CreateUserRequest,
  type UpdateUserProfileRequest,
  type UpdateUserPreferencesRequest,
  type GetUsersQueryRequest,
  type UserIdParamRequest,
} from '../user.schema';

import { DecodedFirebaseToken } from '../../common/services/firebase.service';
import { User } from '../user.table';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Create a new user profile' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User created successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid request data' })
  async createUser(
    @Body(new ZodValidationPipe(createUserSchema)) createUserData: CreateUserRequest,
  ): Promise<User> {
    return this.usersService.createUser(createUserData);
  }

  @Get()
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Get all users with pagination and filtering' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Users retrieved successfully' })
  async getUsers(
    @Query(new ZodValidationPipe(getUsersQuerySchema)) query: GetUsersQueryRequest,
  ): Promise<{ users: User[]; total: number; hasMore: boolean }> {
    return this.usersService.getUsers(query);
  }

  @Get('me')
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Current user profile retrieved' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  async getCurrentUser(@CurrentUser() user: DecodedFirebaseToken): Promise<User> {
    const userProfile = await this.usersService.getUserById(user.uid);
    if (!userProfile) {
      throw new NotFoundException('User profile not found');
    }
    return userProfile;
  }

  @Get(':id')
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User retrieved successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  async getUserById(
    @Param(new ZodValidationPipe(userIdParamSchema)) params: UserIdParamRequest,
  ): Promise<User> {
    const user = await this.usersService.getUserById(params.id);
    if (!user) {
      throw new NotFoundException(`User with ID ${params.id} not found`);
    }
    return user;
  }

  @Put('me')
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Profile updated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  async updateCurrentUserProfile(
    @CurrentUser() user: DecodedFirebaseToken,
    @Body(new ZodValidationPipe(updateUserProfileSchema)) updateData: UpdateUserProfileRequest,
  ): Promise<User> {
    const updatedUser = await this.usersService.updateUser(user.uid, updateData);
    if (!updatedUser) {
      throw new NotFoundException('User profile not found');
    }
    return updatedUser;
  }

  @Put('me/preferences')
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Update current user preferences' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Preferences updated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  async updateCurrentUserPreferences(
    @CurrentUser() user: DecodedFirebaseToken,
    @Body(new ZodValidationPipe(updateUserPreferencesSchema)) preferences: UpdateUserPreferencesRequest,
  ): Promise<User> {
    const updatedUser = await this.usersService.updateUser(user.uid, { preferences });
    if (!updatedUser) {
      throw new NotFoundException('User profile not found');
    }
    return updatedUser;
  }

  @Put(':id')
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Update user by ID (admin only)' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User updated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  async updateUser(
    @Param(new ZodValidationPipe(userIdParamSchema)) params: UserIdParamRequest,
    @Body(new ZodValidationPipe(updateUserProfileSchema)) updateData: UpdateUserProfileRequest,
  ): Promise<User> {
    const updatedUser = await this.usersService.updateUser(params.id, updateData);
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${params.id} not found`);
    }
    return updatedUser;
  }

  @Delete(':id')
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Delete user by ID (admin only)' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  async deleteUser(
    @Param(new ZodValidationPipe(userIdParamSchema)) params: UserIdParamRequest,
  ): Promise<{ message: string; deletedUserId: string }> {
    const deleted = await this.usersService.deleteUser(params.id);
    if (!deleted) {
      throw new NotFoundException(`User with ID ${params.id} not found`);
    }
    return {
      message: 'User deleted successfully',
      deletedUserId: params.id,
    };
  }
}
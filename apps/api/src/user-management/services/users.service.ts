import { Injectable, Logger, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, ilike, asc, desc, count, and } from 'drizzle-orm';
import { users, User, NewUser } from '../user.table';
import {
  CreateUserRequest,
  UpdateUserProfileRequest,
  GetUsersQueryRequest,
} from '../user.schema';

/**
 * Users service handling all user-related database operations using Drizzle ORM
 */
@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @Inject('DATABASE') private db: NodePgDatabase,
  ) {}

  /**
   * Create a new user profile
   */
  async createUser(userData: CreateUserRequest): Promise<User> {
    try {
      const newUser: NewUser = {
        id: userData.id,
        email: userData.email,
        displayName: userData.displayName || null,
        preferences: userData.preferences || null,
        subscriptionStatus: userData.subscriptionStatus || 'free',
        isActive: true,
      };

      const [createdUser] = await this.db
        .insert(users)
        .values(newUser)
        .returning();

      this.logger.log(`Created user: ${createdUser.id}`);
      return createdUser;
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get user by ID (Firebase UID)
   */
  async getUserById(id: string): Promise<User | null> {
    try {
      const [user] = await this.db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);

      return user || null;
    } catch (error) {
      this.logger.error(`Failed to get user ${id}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const [user] = await this.db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      return user || null;
    } catch (error) {
      this.logger.error(`Failed to get user by email ${email}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Update user profile
   */
  async updateUser(id: string, updateData: Partial<UpdateUserProfileRequest>): Promise<User | null> {
    try {
      const updatePayload: Partial<NewUser> = {
        ...updateData,
        updatedAt: new Date(),
      };

      const [updatedUser] = await this.db
        .update(users)
        .set(updatePayload)
        .where(eq(users.id, id))
        .returning();

      if (updatedUser) {
        this.logger.log(`Updated user: ${updatedUser.id}`);
      }

      return updatedUser || null;
    } catch (error) {
      this.logger.error(`Failed to update user ${id}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Update user last login timestamp
   */
  async updateLastLogin(id: string): Promise<void> {
    try {
      await this.db
        .update(users)
        .set({ 
          lastLoginAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(users.id, id));

      this.logger.debug(`Updated last login for user: ${id}`);
    } catch (error) {
      this.logger.error(`Failed to update last login for user ${id}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get users with pagination and filtering
   */
  async getUsers(query: GetUsersQueryRequest): Promise<{ users: User[]; total: number; hasMore: boolean }> {
    try {
      const { limit, offset, search, subscriptionStatus, sortBy, sortOrder } = query;

      // Build where conditions
      const conditions = [];
      
      if (search) {
        conditions.push(
          ilike(users.email, `%${search}%`),
          // Add OR condition for displayName if needed
        );
      }

      if (subscriptionStatus) {
        conditions.push(eq(users.subscriptionStatus, subscriptionStatus));
      }

      const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

      // Build order by clause
      const orderBy = sortOrder === 'desc' 
        ? desc(users[sortBy])
        : asc(users[sortBy]);

      // Get users with pagination
      const userResults = await this.db
        .select()
        .from(users)
        .where(whereClause)
        .orderBy(orderBy)
        .limit(limit)
        .offset(offset);

      // Get total count
      const [{ total }] = await this.db
        .select({ total: count() })
        .from(users)
        .where(whereClause);

      const hasMore = offset + limit < total;

      this.logger.debug(`Retrieved ${userResults.length} users (total: ${total})`);

      return {
        users: userResults,
        total,
        hasMore,
      };
    } catch (error) {
      this.logger.error(`Failed to get users: ${error.message}`);
      throw error;
    }
  }

  /**
   * Delete user by ID (soft delete by setting isActive to false)
   */
  async deleteUser(id: string): Promise<boolean> {
    try {
      const [deletedUser] = await this.db
        .update(users)
        .set({ 
          isActive: false,
          updatedAt: new Date(),
        })
        .where(eq(users.id, id))
        .returning();

      if (deletedUser) {
        this.logger.log(`Soft deleted user: ${deletedUser.id}`);
        return true;
      }

      return false;
    } catch (error) {
      this.logger.error(`Failed to delete user ${id}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Create user if not exists (used for first-time Firebase users)
   */
  async createUserIfNotExists(firebaseUser: { uid: string; email?: string; name?: string }): Promise<User> {
    try {
      // Check if user already exists
      const existingUser = await this.getUserById(firebaseUser.uid);
      
      if (existingUser) {
        // Update last login and return existing user
        await this.updateLastLogin(firebaseUser.uid);
        return existingUser;
      }

      // Create new user from Firebase data
      const newUserData: CreateUserRequest = {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: firebaseUser.name,
        subscriptionStatus: 'free',
      };

      const createdUser = await this.createUser(newUserData);
      await this.updateLastLogin(firebaseUser.uid);
      
      return createdUser;
    } catch (error) {
      this.logger.error(`Failed to create user if not exists: ${error.message}`);
      throw error;
    }
  }
}
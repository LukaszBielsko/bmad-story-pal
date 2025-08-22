# API Specifications

## Authentication

### Firebase Auth Integration
```typescript
// All protected endpoints require Authorization header
Authorization: Bearer <firebase_jwt_token>

// User context available in all controllers
interface RequestUser {
  uid: string;
  email: string;
  emailVerified: boolean;
}
```

## Story Generation API

### Generate Story
```typescript
POST /stories/generate
Content-Type: application/json
Authorization: Bearer <token>

Request Body:
{
  childProfileId: string,
  theme: 'adventure' | 'animals' | 'princess' | 'space' | 'friendship' | 'magic',
  personalization: {
    favoriteColor?: string,
    petName?: string,
    hobby?: string,
    specialDetail?: string
  }
}

Response (200):
{
  story: {
    id: string,
    title: string,
    content: string,
    theme: string,
    ageGroup: string,
    wordCount: number,
    readingTimeMinutes: number,
    personalizationData: object
  },
  generationTime: number,
  requestId: string
}

Response (400):
{
  error: "VALIDATION_ERROR",
  message: "Child profile not found",
  details: object
}

Response (429):
{
  error: "RATE_LIMIT_EXCEEDED",
  message: "Too many requests, try again in 60 seconds",
  retryAfter: 60
}

Response (503):
{
  error: "GENERATION_TIMEOUT",
  message: "Story generation timed out",
  fallbackStory: Story
}
```

### Get Generation Status
```typescript
GET /stories/generation/{requestId}
Authorization: Bearer <token>

Response (200):
{
  status: 'pending' | 'completed' | 'failed',
  story?: Story,
  progress?: number,
  estimatedTimeRemaining?: number
}
```

## Story Management API

### Get User Stories
```typescript
GET /user-stories
Authorization: Bearer <token>

Query Parameters:
- childProfileId?: string
- theme?: string
- isFavorite?: boolean
- search?: string (searches title and content)
- limit?: number (default: 20, max: 50)
- offset?: number (default: 0)
- sortBy?: 'created_at' | 'last_read_at' | 'times_read'
- sortOrder?: 'asc' | 'desc' (default: 'desc')

Response (200):
{
  stories: UserStory[],
  total: number,
  hasMore: boolean,
  filters: {
    availableThemes: string[],
    availableChildren: ChildProfile[]
  }
}
```

### Save Story
```typescript
POST /user-stories
Authorization: Bearer <token>

Request Body:
{
  storyId: string,
  childProfileId: string,
  customTitle?: string
}

Response (201):
{
  userStory: {
    id: string,
    storyId: string,
    childProfileId: string,
    isFavorite: boolean,
    timesRead: number,
    savedAt: string,
    customTitle?: string,
    story: Story,
    childProfile: ChildProfile
  }
}

Response (409):
{
  error: "STORY_ALREADY_SAVED",
  message: "Story is already in your library",
  existingUserStory: UserStory
}
```

### Update Story Status
```typescript
PATCH /user-stories/{userStoryId}
Authorization: Bearer <token>

Request Body:
{
  isFavorite?: boolean,
  customTitle?: string,
  incrementReadCount?: boolean
}

Response (200):
{
  userStory: UserStory
}
```

### Delete Saved Story
```typescript
DELETE /user-stories/{userStoryId}
Authorization: Bearer <token>

Response (204): No content
```

## Child Profile API

### Create Child Profile
```typescript
POST /child-profiles
Authorization: Bearer <token>

Request Body:
{
  name: string,
  age: number, // 3-8
  interests?: string[],
  preferences?: {
    favoriteColors?: string[],
    favoriteAnimals?: string[],
    hobbies?: string[]
  }
}

Response (201):
{
  profile: {
    id: string,
    name: string,
    age: number,
    avatarUrl?: string,
    interests: string[],
    preferences: object,
    createdAt: string
  }
}
```

### Get Child Profiles
```typescript
GET /child-profiles
Authorization: Bearer <token>

Response (200):
{
  profiles: ChildProfile[]
}
```

### Update Child Profile
```typescript
PATCH /child-profiles/{profileId}
Authorization: Bearer <token>

Request Body:
{
  name?: string,
  age?: number,
  interests?: string[],
  preferences?: object
}

Response (200):
{
  profile: ChildProfile
}
```

### Upload Avatar
```typescript
POST /child-profiles/{profileId}/avatar
Authorization: Bearer <token>
Content-Type: multipart/form-data

Request Body:
{
  avatar: File // Image file (JPEG, PNG, max 2MB)
}

Response (200):
{
  avatarUrl: string
}
```

## Pre-Generated Stories API

### Get Pre-Generated Stories
```typescript
GET /stories/library
Authorization: Bearer <token>

Query Parameters:
- theme?: string
- ageGroup?: '3-4' | '5-6' | '7-8'
- language?: string (default: 'pl')
- limit?: number (default: 20)

Response (200):
{
  stories: Story[],
  total: number,
  themes: string[],
  ageGroups: string[]
}
```

### Get Story by ID
```typescript
GET /stories/{storyId}
Authorization: Bearer <token>

Response (200):
{
  story: Story
}

Response (404):
{
  error: "STORY_NOT_FOUND",
  message: "Story not found"
}
```

## Offline Sync API

### Get Sync Data
```typescript
GET /sync/stories
Authorization: Bearer <token>

Query Parameters:
- lastSyncAt?: string (ISO timestamp)
- includeContent?: boolean (default: true)

Response (200):
{
  stories: OfflineStory[],
  profiles: OfflineProfile[],
  syncTimestamp: string,
  hasMore: boolean
}
```

### Upload Offline Activity
```typescript
POST /sync/activity
Authorization: Bearer <token>

Request Body:
{
  activities: [
    {
      type: 'story_read' | 'story_favorited' | 'story_unfavorited',
      storyId: string,
      timestamp: string,
      metadata?: object
    }
  ]
}

Response (200):
{
  processed: number,
  skipped: number,
  errors: string[]
}
```

## Analytics API

### Track Story Interaction
```typescript
POST /analytics/story-interaction
Authorization: Bearer <token>

Request Body:
{
  storyId: string,
  childProfileId: string,
  action: 'started' | 'completed' | 'abandoned',
  readingTime?: number,
  progressPercentage?: number,
  metadata?: object
}

Response (204): No content
```

## Error Handling

### Standard Error Response
```typescript
{
  error: string, // Error code
  message: string, // Human-readable message
  details?: object, // Additional error context
  timestamp: string,
  path: string,
  correlationId: string
}
```

### Common Error Codes
- `VALIDATION_ERROR` - Request validation failed
- `UNAUTHORIZED` - Invalid or missing authentication
- `FORBIDDEN` - User lacks permission
- `NOT_FOUND` - Resource not found
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `GENERATION_TIMEOUT` - Story generation timed out
- `CONTENT_SAFETY_VIOLATION` - Generated content failed safety checks
- `EXTERNAL_SERVICE_ERROR` - OpenAI or other service unavailable

## Rate Limiting

### Story Generation Limits
- **Free Users:** 10 generations per day
- **Authenticated Users:** 50 generations per day
- **Rate Windows:** 5 requests per minute

### General API Limits
- **Authenticated Requests:** 1000 per hour
- **File Uploads:** 10 per hour
- **Sync Requests:** 100 per hour

## API Versioning

### Version Header
```
API-Version: v1
```

### Backward Compatibility
- Breaking changes require new version
- Deprecated endpoints supported for 6 months
- Client version compatibility checking
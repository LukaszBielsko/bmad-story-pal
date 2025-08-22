# Database Schema Design

## PostgreSQL Schema (Primary Database)

### Users Table
```sql
CREATE TABLE users (
  id varchar(128) PRIMARY KEY, -- Firebase UID
  email varchar(255) UNIQUE NOT NULL,
  display_name varchar(100),
  created_at timestamp DEFAULT NOW(),
  updated_at timestamp DEFAULT NOW(),
  preferences jsonb DEFAULT '{}',
  subscription_status varchar(50) DEFAULT 'free'
);
```

### Child Profiles Table
```sql
CREATE TABLE child_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id varchar(128) REFERENCES users(id) ON DELETE CASCADE,
  name varchar(100) NOT NULL,
  age integer CHECK (age >= 3 AND age <= 8),
  avatar_url varchar(500),
  interests jsonb DEFAULT '[]',
  preferences jsonb DEFAULT '{}',
  created_at timestamp DEFAULT NOW(),
  updated_at timestamp DEFAULT NOW()
);
```

### Stories Table
```sql
CREATE TABLE stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title varchar(200) NOT NULL,
  content text NOT NULL,
  theme varchar(50) NOT NULL,
  age_group varchar(10) NOT NULL,
  language varchar(5) DEFAULT 'pl',
  type varchar(20) NOT NULL, -- "generated", "pre_written"
  word_count integer,
  reading_time_minutes integer,
  safety_status varchar(20) DEFAULT 'approved',
  safety_metadata jsonb DEFAULT '{}',
  personalization_data jsonb DEFAULT '{}',
  created_at timestamp DEFAULT NOW()
);
```

### User Stories Table
```sql
CREATE TABLE user_stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id varchar(128) REFERENCES users(id) ON DELETE CASCADE,
  child_profile_id uuid REFERENCES child_profiles(id) ON DELETE CASCADE,
  story_id uuid REFERENCES stories(id) ON DELETE CASCADE,
  is_favorite boolean DEFAULT false,
  times_read integer DEFAULT 0,
  last_read_at timestamp,
  saved_at timestamp DEFAULT NOW(),
  custom_title varchar(200),
  UNIQUE(user_id, story_id)
);
```

### Story Requests Table (Analytics)
```sql
CREATE TABLE story_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id varchar(128) REFERENCES users(id),
  child_profile_id uuid REFERENCES child_profiles(id),
  theme varchar(50) NOT NULL,
  personalization_input jsonb NOT NULL,
  generated_story_id uuid REFERENCES stories(id),
  generation_time_seconds decimal(5,2),
  openai_usage jsonb DEFAULT '{}',
  status varchar(20) DEFAULT 'pending',
  error_message text,
  created_at timestamp DEFAULT NOW()
);
```

## SQLite Schema (Offline Storage)

### Offline Stories Table
```sql
CREATE TABLE offline_stories (
  id varchar(36) PRIMARY KEY,
  title varchar(200) NOT NULL,
  content text NOT NULL,
  theme varchar(50),
  child_name varchar(100),
  is_favorite integer DEFAULT 0,
  times_read integer DEFAULT 0,
  last_read_at varchar(30),
  synced_at varchar(30)
);
```

### Offline Profiles Table
```sql
CREATE TABLE offline_profiles (
  id varchar(36) PRIMARY KEY,
  name varchar(100) NOT NULL,
  age integer,
  avatar_url varchar(500),
  synced_at varchar(30)
);
```

### Sync Metadata Table
```sql
CREATE TABLE sync_metadata (
  key varchar(50) PRIMARY KEY,
  value text,
  updated_at varchar(30)
);
```

## Data Relationships

### Entity Relationship Diagram
```
users (1) ──── (N) child_profiles
  │                    │
  │                    │
  └── (N) user_stories ──── (1) stories
              │
              └── (1) child_profiles
```

## Data Management Strategies

### Offline Synchronization
1. **Initial Sync:** Download user's saved stories and child profiles
2. **Background Sync:** Periodic updates when online
3. **Conflict Resolution:** Server data takes precedence
4. **Storage Limits:** Maximum 50 saved stories per user

### Data Retention
- **Story Requests:** Retain for 90 days for analytics
- **User Data:** Permanent until user deletion
- **Generated Stories:** Permanent if saved, 7 days if not saved
- **Safety Logs:** Permanent for compliance

### Performance Optimizations
- **Indexes:** On user_id, child_profile_id, theme, created_at
- **Partitioning:** Story requests by month
- **Caching:** Frequently accessed stories in Redis
- **Connection Pooling:** PostgreSQL connection management

## Security Considerations

### Data Protection
- **Encryption at Rest:** AWS RDS encryption
- **Encryption in Transit:** SSL/TLS connections
- **Access Control:** Role-based database permissions
- **Audit Logging:** All data modifications logged

### Privacy Compliance
- **Data Minimization:** Only collect necessary information
- **Right to Deletion:** Complete user data removal capability
- **Data Export:** Full user data export in JSON format
- **Child Protection:** Strict content safety measures
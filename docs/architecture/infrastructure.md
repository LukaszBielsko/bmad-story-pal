# Infrastructure & Deployment Architecture

## AWS Cloud Infrastructure

### Production Environment (eu-central-1)

```
┌─────────────────────────────────────────────────────────────────┐
│                        VPC (10.0.0.0/16)                       │
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌──────────────┐ │
│  │  Public Subnet  │    │ Private Subnet  │    │Private Subnet│ │
│  │   (10.0.1.0/24) │    │  (10.0.2.0/24)  │    │(10.0.3.0/24) │ │
│  │                 │    │                 │    │              │ │
│  │ ┌─────────────┐ │    │ ┌─────────────┐ │    │┌────────────┐│ │
│  │ │     ALB     │ │    │ │ ECS Fargate │ │    ││PostgreSQL  ││ │
│  │ │             │ │    │ │   Cluster   │ │    ││    RDS     ││ │
│  │ └─────────────┘ │    │ └─────────────┘ │    │└────────────┘│ │
│  │                 │    │                 │    │              │ │
│  │ ┌─────────────┐ │    │ ┌─────────────┐ │    │┌────────────┐│ │
│  │ │   NAT GW    │ │    │ │Redis Cluster│ │    ││   S3       ││ │
│  │ │             │ │    │ │ElastiCache  │ │    ││  Storage   ││ │
│  │ └─────────────┘ │    │ └─────────────┘ │    │└────────────┘│ │
│  └─────────────────┘    └─────────────────┘    └──────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

External Services:
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CloudFront    │    │   Route 53      │    │  Certificate    │
│      CDN        │    │      DNS        │    │   Manager       │
└─────────────────┘    └─────────────────┘    └─────────────────┘

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Firebase      │    │    OpenAI       │    │   CloudWatch    │
│     Auth        │    │      API        │    │   Monitoring    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Core Infrastructure Components

### Compute Layer - ECS Fargate
```yaml
Cluster Configuration:
  Name: storymagic-production
  Launch Type: FARGATE
  Platform Version: 1.4.0
  
Service Configuration:
  Service Name: storymagic-api
  Task Definition: storymagic-api:latest
  Desired Count: 2
  Min Healthy Percent: 50
  Max Percent: 200
  
Auto Scaling:
  Min Capacity: 1
  Max Capacity: 4
  Target CPU: 70%
  Target Memory: 80%
  Scale Out Cooldown: 300s
  Scale In Cooldown: 300s

Task Definition:
  CPU: 1024 (1 vCPU)
  Memory: 2048 MB
  Network Mode: awsvpc
  
Container Configuration:
  Image: ECR_REPOSITORY_URL:latest
  Port: 3000
  Health Check: /health
  Environment Variables:
    - NODE_ENV=production
    - DATABASE_HOST=rds-endpoint
    - REDIS_HOST=elasticache-endpoint
    - OPENAI_API_KEY=from-secrets-manager
    - FIREBASE_CONFIG=from-secrets-manager
```

### Database Layer - Amazon RDS
```yaml
PostgreSQL Configuration:
  Engine: PostgreSQL 15.3
  Instance Class: db.t3.medium
  Storage: 100GB GP2 (Auto Scaling to 1000GB)
  Multi-AZ: Yes (High Availability)
  
Backup Configuration:
  Automated Backups: 7 days retention
  Backup Window: 03:00-04:00 UTC
  Maintenance Window: Sun 04:00-05:00 UTC
  
Security:
  VPC Security Group: rds-security-group
  Subnet Group: private-db-subnets
  Encryption at Rest: Yes (AWS KMS)
  
Performance:
  Parameter Group: custom-postgresql15
  Shared Preload Libraries: pg_stat_statements
  Max Connections: 200
  Work Memory: 16MB
```

### Caching Layer - ElastiCache Redis
```yaml
Redis Configuration:
  Engine: Redis 7.0
  Node Type: cache.t3.micro
  Number of Nodes: 1 (Single AZ for development)
  
Security:
  VPC Security Group: redis-security-group
  Subnet Group: private-cache-subnets
  Encryption in Transit: Yes
  Encryption at Rest: Yes
  
Configuration:
  Max Memory Policy: allkeys-lru
  Timeout: 0
  TCP Keep Alive: 300
```

### Load Balancer - Application Load Balancer
```yaml
ALB Configuration:
  Name: storymagic-alb
  Scheme: internet-facing
  IP Address Type: ipv4
  
Listeners:
  HTTP (80):
    Action: Redirect to HTTPS
  HTTPS (443):
    Certificate: ACM Certificate
    Target Group: storymagic-api-tg
    
Target Group:
  Protocol: HTTP
  Port: 3000
  Health Check Path: /health
  Health Check Interval: 30s
  Healthy Threshold: 2
  Unhealthy Threshold: 3
  Timeout: 5s
```

### Content Delivery - CloudFront CDN
```yaml
CloudFront Distribution:
  Origin: storymagic-alb-domain.com
  Behavior:
    - Path: /api/* (Forward all headers, no caching)
    - Path: /assets/* (Cache for 1 year)
    - Default: Cache for 1 hour
  
Security:
  SSL Certificate: ACM Certificate
  Security Policy: TLSv1.2_2021
  HTTP Version: HTTP/2
  
Geographic Restrictions:
  Type: Whitelist
  Countries: EU countries (GDPR compliance)
```

## Security Architecture

### Network Security
```yaml
VPC Configuration:
  CIDR: 10.0.0.0/16
  
Security Groups:
  alb-security-group:
    Inbound: 80, 443 from 0.0.0.0/0
    Outbound: All traffic
    
  ecs-security-group:
    Inbound: 3000 from alb-security-group
    Outbound: 443 to 0.0.0.0/0, 5432 to rds-sg, 6379 to redis-sg
    
  rds-security-group:
    Inbound: 5432 from ecs-security-group
    Outbound: None
    
  redis-security-group:
    Inbound: 6379 from ecs-security-group
    Outbound: None

NACLs:
  Public Subnets: Default NACL (allow all)
  Private Subnets: Custom NACL (restricted)
```

### Access Control - IAM
```yaml
ECS Task Role:
  Permissions:
    - Read from Secrets Manager
    - Write to CloudWatch Logs
    - Read/Write to S3 bucket
    
ECS Execution Role:
  Permissions:
    - Pull images from ECR
    - Create log groups
    - Read secrets for container startup
    
Deployment Role:
  Permissions:
    - Update ECS services
    - Push to ECR
    - Update task definitions
```

### Secrets Management
```yaml
AWS Secrets Manager:
  storymagic/openai-api-key:
    Type: String
    Rotation: Manual
    
  storymagic/firebase-config:
    Type: JSON
    Contains: Service account key
    
  storymagic/database-credentials:
    Type: JSON
    Contains: Username, password
    Auto-rotation: 30 days
```

## Monitoring & Observability

### CloudWatch Configuration
```yaml
Log Groups:
  /ecs/storymagic-api:
    Retention: 30 days
    
  /aws/rds/instance/storymagic-db/postgresql:
    Retention: 7 days
    
Custom Metrics:
  story_generation_time:
    Unit: Seconds
    Dimensions: [theme, age_group]
    
  content_safety_violations:
    Unit: Count
    Dimensions: [violation_type]
    
  api_response_time:
    Unit: Milliseconds
    Dimensions: [endpoint, method]

Alarms:
  High CPU Utilization:
    Metric: AWS/ECS/CPUUtilization
    Threshold: > 80% for 5 minutes
    Action: SNS notification + Auto Scaling
    
  Database Connection Count:
    Metric: AWS/RDS/DatabaseConnections
    Threshold: > 180 connections
    Action: SNS notification
    
  Generation Timeout Rate:
    Metric: StoryMagic/GenerationTimeouts
    Threshold: > 5% in 10 minutes
    Action: SNS notification
    
  Content Safety Violations:
    Metric: StoryMagic/SafetyViolations
    Threshold: > 0 in any period
    Action: Immediate SNS alert
```

### Application Performance Monitoring
```yaml
AWS X-Ray Configuration:
  Tracing: Enabled
  Sampling Rate: 10%
  
Custom Metrics:
  - Story generation latency by theme
  - Database query performance
  - External API response times
  - Cache hit/miss ratios
  
Health Checks:
  /health:
    - Database connectivity
    - Redis connectivity
    - OpenAI API availability
    - Memory usage < 90%
    - CPU usage < 95%
```

## Deployment Pipeline

### CI/CD with GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run test
      - run: npm run test:e2e
      - run: npm run lint
      
  build-and-deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: eu-central-1
          
      - name: Build and push Docker image
        run: |
          aws ecr get-login-password | docker login --username AWS --password-stdin $ECR_REGISTRY
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$GITHUB_SHA .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$GITHUB_SHA
          
      - name: Deploy to ECS
        run: |
          aws ecs update-service \
            --cluster storymagic-production \
            --service storymagic-api \
            --task-definition storymagic-api:latest \
            --force-new-deployment
```

### Blue-Green Deployment Strategy
```yaml
Deployment Process:
  1. Build new task definition with updated image
  2. Create new ECS service revision
  3. Route 10% traffic to new version
  4. Monitor health metrics for 10 minutes
  5. If healthy, route 50% traffic
  6. Monitor for 5 minutes
  7. If healthy, route 100% traffic
  8. Terminate old task instances
  
Rollback Strategy:
  - Automatic rollback if health checks fail
  - Manual rollback capability via AWS CLI
  - Previous task definition kept for 24 hours
```

## Cost Optimization

### Resource Sizing
```yaml
Development Environment:
  ECS: 1 task, 0.5 vCPU, 1GB RAM
  RDS: db.t3.micro, Single AZ
  ElastiCache: cache.t3.micro
  
Production Environment:
  ECS: 2-4 tasks, 1 vCPU, 2GB RAM each
  RDS: db.t3.medium, Multi-AZ
  ElastiCache: cache.t3.micro
  
Estimated Monthly Costs:
  Development: ~$100 USD
  Production: ~$300 USD
  OpenAI API: Variable based on usage
```

### Cost Monitoring
```yaml
Budget Alerts:
  Monthly Budget: $400 USD
  Alert Thresholds: 80%, 90%, 100%
  
Cost Allocation Tags:
  - Environment: production/development
  - Component: api/database/cache
  - Project: storymagic
  
Reserved Instances:
  RDS: 1-year term for production
  ElastiCache: On-demand (low usage)
```

## Disaster Recovery

### Backup Strategy
```yaml
Database Backups:
  Automated: Daily, 7-day retention
  Manual: Before major deployments
  Point-in-time Recovery: Available
  
Application Backups:
  Docker Images: Stored in ECR, 30-day retention
  Configuration: Version controlled in Git
  Secrets: Backed up in Secrets Manager
  
Recovery Procedures:
  RTO (Recovery Time Objective): 4 hours
  RPO (Recovery Point Objective): 1 hour
  
Multi-Region Considerations:
  Primary: eu-central-1 (Frankfurt)
  Backup: eu-west-1 (Ireland) - for future implementation
```

### Infrastructure as Code
```yaml
Terraform Configuration:
  modules/
    ├── vpc/
    ├── ecs/
    ├── rds/
    ├── elasticache/
    ├── alb/
    ├── cloudfront/
    ├── iam/
    └── monitoring/
    
State Management:
  Backend: S3 bucket with versioning
  State Locking: DynamoDB table
  Encryption: AWS KMS
  
Environment Management:
  Workspaces: development, staging, production
  Variable Files: per environment configuration
```
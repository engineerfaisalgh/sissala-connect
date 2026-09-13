# Sissala Connect - Architecture Overview

## System Design Principles

1. **Monolithic Architecture**: Single codebase with modular organization
2. **API-First**: REST API as the contract between frontend and backend
3. **Security-First**: Authorization checks at every layer
4. **Privacy-Centered**: Granular controls over data visibility
5. **Scalability**: Horizontal scaling through stateless API and caching
6. **Maintainability**: Clear separation of concerns, comprehensive testing

## High-Level Architecture

```
┌─────────────────────────────────────┐
│      Client (Browser/Mobile)        │
│      Next.js + React + PWA          │
└──────────────┬──────────────────────┘
               │
        ┌──────▼────────┐
        │  HTTPS/TLS    │
        └──────┬────────┘
               │
┌──────────────▼────────────────────────┐
│     API Gateway / Load Balancer       │
│  (Rate Limiting, Request Validation)  │
└──────────────┬────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│    Node.js Backend (Express/Fastify)   │
│  ┌──────────────────────────────────┐  │
│  │  Authentication & Authorization  │  │
│  │  Middleware & Rate Limiting      │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │  API Modules                     │  │
│  │  - Auth                          │  │
│  │  - Users & Profiles              │  │
│  │  - Professionals & Services      │  │
│  │  - Organizations                 │  │
│  │  - Jobs & Applications           │  │
│  │  - Opportunities                 │  │
│  │  - Messaging                     │  │
│  │  - Search                        │  │
│  │  - Notifications                 │  │
│  │  - Admin                         │  │
│  └──────────────────────────────────┘  │
└──────────────┬──────────────────────────┘
               │
     ┌─────────┼─────────┬──────────┐
     │         │         │          │
┌────▼──┐ ┌───▼───┐ ┌──▼───┐ ┌───▼───┐
│   DB  │ │ Cache │ │ Jobs │ │Storage│
│  PG   │ │ Redis │ │Queue │ │  S3   │
└───────┘ └───────┘ └──────┘ └───────┘
```

## Backend Stack

### Framework & Runtime
- **Runtime**: Node.js 18+ (LTS)
- **Framework**: Express.js or Fastify
- **Language**: TypeScript
- **Package Manager**: npm or yarn

### Core Libraries
- **Auth**: jsonwebtoken, bcryptjs, OTP generation
- **Database**: pg (PostgreSQL client), Knex (migrations)
- **Validation**: Joi, Zod
- **Logging**: Winston, Pino
- **Error Handling**: Custom error classes, centralized handler
- **Testing**: Jest, supertest, testcontainers

### API Structure

```
packages/backend/
├── src/
│   ├── config/          # Configuration (DB, env, etc)
│   ├── middleware/      # Auth, validation, error handling
│   ├── modules/         # Feature modules
│   │   ├── auth/
│   │   ├── users/
│   │   ├── profiles/
│   │   ├── professionals/
│   │   ├── organizations/
│   │   ├── jobs/
│   │   ├── opportunities/
│   │   ├── messaging/
│   │   ├── search/
│   │   ├── notifications/
│   │   ├── verification/
│   │   ├── reports/
│   │   └── admin/
│   ├── services/        # Business logic
│   ├── database/        # Schema, migrations
│   ├── utils/           # Helpers, validators
│   ├── types/           # TypeScript interfaces
│   └── app.ts           # Express app setup
├── migrations/          # Database migrations
├── tests/               # Test suites
├── .env.example
├── tsconfig.json
└── package.json
```

## Frontend Stack

### Framework & Runtime
- **Framework**: Next.js 14+ (App Router)
- **UI Library**: React 18+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: Context API + hooks or Zustand
- **Data Fetching**: fetch + custom hooks, SWR, or TanStack Query

### Key Features
- **Mobile-First**: Responsive design, touch-optimized
- **PWA**: Service workers, offline support
- **Performance**: Image optimization, code splitting, lazy loading
- **Accessibility**: WCAG 2.1 AA compliance
- **SEO**: Meta tags, structured data

### Directory Structure

```
packages/frontend/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js app router
│   │   ├── (auth)/
│   │   ├── (main)/
│   │   ├── admin/
│   │   └── layout.tsx
│   ├── components/      # Reusable components
│   │   ├── common/
│   │   ├── auth/
│   │   ├── profiles/
│   │   ├── search/
│   │   └── ...
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities
│   │   ├── api.ts       # API client
│   │   ├── auth.ts      # Auth utilities
│   │   └── ...
│   ├── types/           # TypeScript types
│   ├── styles/          # Global styles
│   └── middleware.ts    # Next.js middleware
├── .env.example
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Database Schema (PostgreSQL)

### User & Identity Tables
- `users` - Core user account
- `profiles` - User profile details
- `user_privacy_settings` - Visibility controls
- `education_records` - Education history
- `occupations` - Current/past occupations

### Professional System
- `professional_profiles` - Professional mode data
- `professional_skills` - Skills and proficiencies
- `professional_services` - Services offered
- `professional_availability` - Availability info
- `portfolio_items` - Portfolio entries

### Organization System
- `organizations` - Organization workspace
- `organization_members` - Membership records
- `organization_roles` - Custom roles
- `organization_invitations` - Pending invites
- `committees` - Organization committees
- `committee_members` - Committee membership

### Jobs & Applications
- `jobs` - Job postings
- `job_skills` - Required skills
- `job_applications` - Job applications
- `job_status_history` - Status audit trail

### Services & Requests
- `services` - Service definitions
- `service_requests` - Service requests

### Opportunities
- `opportunities` - Opportunity postings
- `opportunity_applications` - Applications
- `saved_opportunities` - Saved by users

### Events & Projects
- `events` - Organization events
- `event_registrations` - Event registrations
- `attendance_records` - Attendance records
- `projects` - Organization projects
- `project_tasks` - Project tasks

### Messaging
- `conversations` - Conversation threads
- `conversation_participants` - Participants
- `messages` - Individual messages
- `message_attachments` - Message files

### Social Features
- `reviews` - Reviews and ratings
- `saved_profiles` - Saved profiles
- `user_blocks` - Block relationships

### Verification & Moderation
- `verifications` - Verification records
- `reports` - User reports
- `moderation_actions` - Moderation decisions

### System Tables
- `roles` - Platform roles
- `permissions` - Permission definitions
- `role_permissions` - Role-permission mappings
- `notifications` - Notification records
- `notification_preferences` - User preferences
- `audit_logs` - System audit trail
- `sessions` - User sessions
- `file_assets` - File metadata
- `consent_records` - User consents

### Reference Data
- `countries` - Country data
- `regions` - Geographic regions
- `districts` - Districts
- `communities` - Communities
- `community_aliases` - Community name aliases
- `professions` - Profession definitions
- `skills` - Skill definitions
- `search_aliases` - Search term aliases

## Security Architecture

### Authentication Flow

```
User Registration
  ↓
Validate Input
  ↓
Create Pending Account
  ↓
Send OTP (SMS/WhatsApp)
  ↓
Verify OTP (with expiry, attempt limits)
  ↓
Activate Account
  ↓
Issue JWT + Refresh Token
  ↓
Profile Completion
  ↓
Access Dashboard
```

### Authorization

- **JWT-based**: Stateless tokens with expiry
- **Role-Based Access Control (RBAC)**: User roles + platform permissions
- **Object-Level Authorization**: Users can only access their own data
- **Organization Isolation**: Organization data scoped to members
- **Audit Trail**: All admin/sensitive actions logged

### Security Headers

```
Content-Security-Policy
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security
Referrer-Policy: strict-origin-when-cross-origin
```

### Data Protection

- **Password Hashing**: bcryptjs (10+ rounds)
- **Sensitive Data**: Encrypted at rest (optional)
- **File Uploads**: Scanned, validated, isolated in S3
- **PII**: Privacy settings respected at all layers
- **Backups**: Encrypted and version-controlled

## API Module Organization

Each module follows this structure:

```
modules/feature/
├── routes.ts       # Route definitions
├── controller.ts   # Request handlers
├── service.ts      # Business logic
├── repository.ts   # Database queries
├── types.ts        # TypeScript interfaces
├── validation.ts   # Input validation
├── middleware.ts   # Feature-specific middleware
└── __tests__/      # Test suite
```

## Deployment Architecture

### Environments

1. **LOCAL**: Developer machine
2. **DEVELOPMENT**: Shared dev server
3. **STAGING**: Production-like environment
4. **UAT**: User acceptance testing
5. **PRODUCTION**: Live environment

### CI/CD Pipeline

```
Git Push
  ↓
Lint & Format Check
  ↓
Unit Tests
  ↓
Integration Tests
  ↓
Security Scanning (SAST, dependency check)
  ↓
Build (Docker image)
  ↓
Deploy to Staging
  ↓
Smoke Tests
  ↓
UAT Approval Gate
  ↓
Deploy to Production
```

### Infrastructure

- **Container**: Docker
- **Orchestration**: Docker Compose (dev), Kubernetes (prod)
- **Database**: PostgreSQL (managed or self-hosted)
- **Cache**: Redis
- **Storage**: S3-compatible (AWS S3, MinIO, etc)
- **CDN**: CloudFront or similar
- **Monitoring**: Prometheus, Grafana, ELK
- **Error Tracking**: Sentry
- **Logging**: Centralized logging (ELK, Datadog)

## Scaling Strategy

### Phase 1 (MVP)
- Single app server
- Single database
- Redis for sessions/caching
- S3 for file storage

### Phase 2+
- Load-balanced app servers
- Read replicas for database
- Distributed caching
- Message queue for async jobs
- CDN for static assets
- Separate admin interface (optional)

## Testing Strategy

- **Unit Tests**: 80%+ coverage
- **Integration Tests**: Database, external services
- **API Tests**: All endpoints with various scenarios
- **Security Tests**: BOLA/IDOR, SQL injection, XSS
- **Authorization Tests**: Cross-user, cross-org access
- **UI Tests**: Component and E2E
- **Performance Tests**: Load and stress testing
- **Accessibility Tests**: WCAG compliance

## Performance Optimization

- **Lazy Loading**: Images, components, routes
- **Code Splitting**: Route-based bundles
- **Caching**: API responses, database queries
- **Compression**: Gzip/Brotli
- **Image Optimization**: WebP, responsive
- **Pagination**: Large datasets
- **Indexing**: Strategic database indexes
- **CDN**: Static asset distribution
- **Connection Pooling**: Database connections

## Future Extensibility

- **Multiple Regions**: Region-scoped queries
- **Multi-Currency**: Currency selection per context
- **Payment Integration**: Pluggable payment providers
- **Mobile Apps**: Shared API, native apps
- **AI Features**: Semantic search, matching algorithms
- **Internationalization**: i18n framework ready
- **Custom Roles**: Already supports org-level role creation
- **Webhooks**: Event-driven integrations

---

For implementation details, see individual module documentation.

# Sissala Connect

A production-grade digital platform connecting Sissala communities, professionals, organizations, and opportunities.

## Vision

**"Find the right person, skill, service, organization or opportunity — and connect the right people."**

Sissala Connect is built to serve Sissala Land and Ghana initially, with architecture designed for regional and global expansion.

## Core Features (MVP)

- **Authentication**: Secure registration, phone/WhatsApp verification, OTP-based flows
- **Profiles**: Comprehensive user profiles with privacy controls
- **Professionals**: Professional mode activation, services, skills, availability
- **Employers**: Job posting, talent discovery, application management
- **Organizations**: Independent workspaces for groups, NGOs, businesses, clubs
- **Search**: Full-text search across people, skills, services, organizations, opportunities
- **Jobs & Services**: Job posting and service request management
- **Messaging**: Direct and group conversations
- **Notifications**: Real-time event notifications
- **Verification**: Phone, professional, organization, and credential verification
- **Moderation**: Reporting, review, and action workflows
- **Privacy**: Granular visibility controls for all user data

## Architecture

- **Monolith**: Single codebase, modular organization
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, mobile-first
- **Backend**: Node.js, TypeScript, Express/Fastify, REST API
- **Database**: PostgreSQL with migrations
- **Storage**: S3-compatible object storage
- **Security**: BOLA/IDOR protection, audit logging, encryption

## Project Structure

```
sissala-connect/
├── packages/
│   ├── backend/          # Node.js backend
│   ├── frontend/         # Next.js frontend
│   └── shared/           # Shared types and utilities
├── docs/                 # Documentation
├── docker-compose.yml    # Local development stack
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Redis (optional, for caching and queues)
- S3-compatible storage (local or cloud)

### Local Development

```bash
# Install dependencies
npm install

# Copy environment templates
cp packages/backend/.env.example packages/backend/.env.local
cp packages/frontend/.env.example packages/frontend/.env.local

# Start development servers
npm run dev
```

## Development Phases

### Phase 1 (MVP)
- Authentication & profiles
- Professional system
- Basic job management
- Search
- Messaging
- Verification & moderation

### Phase 2
- Events & attendance
- Committees
- Organization projects

### Phase 3
- Payments & subscriptions
- Featured profiles/jobs
- Advanced analytics

### Phase 4
- AI-powered search
- Semantic matching
- Personalized discovery

## Security

- Strong password hashing (bcrypt)
- Secure sessions with JWT/refresh tokens
- OTP with expiry and attempt limits
- Rate limiting on all public endpoints
- Input validation and output encoding
- BOLA/IDOR authorization checks
- CSRF protection
- Audit logging
- Admin MFA
- HTTPS in production

## Performance & Accessibility

- Optimized for low-bandwidth environments
- Image compression and lazy loading
- Pagination for large datasets
- PWA support
- WCAG 2.1 AA compliance target
- Responsive design

## Database

See `docs/DATABASE.md` for full schema documentation.

Key tables:
- users, profiles, education_records, occupations
- professionals, professional_skills, professional_services
- jobs, job_applications, service_requests
- organizations, organization_members, organization_roles
- conversations, messages, notifications
- reviews, verifications, reports, moderation_actions
- And 20+ more supporting tables

## API

REST API organized by module:

```
/api/v1/
├── /auth
├── /users
├── /profiles
├── /search
├── /professionals
├── /organizations
├── /jobs
├── /opportunities
├── /messages
├── /notifications
├── /verification
├── /reports
└── /admin
```

See `docs/API.md` for detailed endpoints.

## Testing

- Unit tests (Jest)
- Integration tests
- API tests
- Database tests
- Authorization tests
- Security tests (BOLA/IDOR)
- UI/component tests
- E2E tests (Playwright)

```bash
npm run test
```

## Deployment

CI/CD Pipeline:
1. Lint
2. Unit tests
3. Integration tests
4. Security checks
5. Build
6. Staging deployment
7. UAT
8. Production approval
9. Production deployment

See `docs/DEPLOYMENT.md`.

## Privacy & Compliance

- Profile visibility controls (PUBLIC, REGISTERED_USERS, PRIVATE)
- Contact information privacy settings
- Account deactivation and deletion workflows
- Data export capability
- Audit logging
- Designed with Ghanaian data protection in mind

## Key Principles

✅ One account per person with multiple roles/capabilities
✅ Server-side authorization for all protected operations
✅ Real functional application, not a prototype
✅ No fake data, credentials, or organizations
✅ Production-ready security, testing, and deployment
✅ Modular architecture supporting future expansion
✅ Mobile-first design for Ghanaian users
✅ Focus on real economic and community value

## Contributing

See `CONTRIBUTING.md`.

## License

MIT License - See LICENSE file.

## Support

For issues, questions, or suggestions, please open a GitHub issue.

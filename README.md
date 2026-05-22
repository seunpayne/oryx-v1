# Oryx V1 — Work Proof Platform

**Verifiable proof that a specific human iteratively created a specific document.**

---

## Quick Start

### Prerequisites

- Node.js 20+
- Google Cloud Project with OAuth credentials (T-001)
- Supabase project (T-003)

### Setup

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Fill in .env.local with your credentials
# (See Environment Variables below)

# Run development server
npm run dev
```

Open http://localhost:3000

---

## Environment Variables

| Variable | Purpose | Source |
|----------|---------|--------|
| `NEXTAUTH_URL` | App base URL | `http://localhost:3000` (dev) |
| `NEXTAUTH_SECRET` | JWT signing secret | `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID` | OAuth client ID | Google Cloud Console (T-001) |
| `GOOGLE_CLIENT_SECRET` | OAuth client secret | Google Cloud Console (T-001) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Supabase dashboard (T-003) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | Supabase dashboard (T-003) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role | Supabase dashboard (T-003) |
| `SENTRY_DSN` | Error tracking | Sentry project (T-003) |

---

## Project Structure

```
src/
├── app/
│   ├── dashboard/        # Authenticated user dashboard
│   ├── verify/[id]/      # Public verification page
│   ├── api/
│   │   ├── auth/         # NextAuth routes
│   │   ├── documents/    # List Drive documents
│   │   ├── proofs/       # Generate/list proofs
│   │   └── verify/[id]/  # Public proof API
│   └── page.tsx          # Landing page
├── lib/
│   ├── google.ts         # Google API service
│   ├── proof-engine.ts   # Proof calculation logic
│   └── supabase.ts       # Database client
├── components/           # React components
└── types/                # TypeScript types

tests/
├── unit/                 # Vitest unit tests
├── integration/          # API integration tests
└── e2e/                  # Playwright E2E tests

supabase/
└── migrations/           # Database schema migrations
```

---

## Testing

```bash
# Unit tests
npm test

# Coverage report
npm run test:coverage

# E2E tests (requires staging URL)
npm run test:e2e
```

---

## Deployment

### Staging (auto on merge to main)

```bash
vercel --preview
```

### Production (Seun approval required)

```bash
vercel --prod
```

---

## CI/CD Gates

All PRs must pass:

- ✅ Unit tests (80%+ coverage on proof-engine.ts)
- ✅ Integration tests
- ✅ Fredo secret scan (trufflehog)
- ✅ npm audit (no critical vulnerabilities)
- ✅ Build succeeds

---

## Key Features

- **Google OAuth 2.0** — Secure authentication via NextAuth
- **Drive API integration** — Revision history extraction
- **Proof Engine** — Pure calculation logic, zero dependencies
- **Shareable verification links** — Public URLs, no login required
- **Supabase RLS** — Row-level security for data isolation

---

## License

Private — All rights reserved

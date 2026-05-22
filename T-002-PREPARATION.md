# T-002 SCAFFOLD PREPARATION — COMPLETE

**Prepared:** 2026-05-22  
**Status:** Ready for execution pending T-001 completion

---

## What Has Been Created

### Project Structure
```
~/Projects/clients/oryx-v1/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   ├── verify/[id]/
│   │   └── api/
│   │       ├── auth/[...nextauth]/
│   │       ├── documents/
│   │       ├── proofs/
│   │       └── verify/[id]/
│   ├── lib/
│   │   ├── google.ts         ✓ (Google API service)
│   │   ├── proof-engine.ts   ✓ (Calculation logic)
│   │   └── supabase.ts       ✓ (Database client)
│   ├── components/
│   ├── types/
│   │   └── database.ts       ✓ (Supabase types)
│   └── app/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── supabase/
│   └── migrations/
│       └── 001_init_schema.sql  ✓
├── .github/
│   └── workflows/
│       ├── ci.yml            ✓
│       └── deploy.yml        ✓
├── package.json              ✓
├── tsconfig.json             ✓
├── next.config.js            ✓
├── tailwind.config.ts        ✓
├── .gitignore                ✓
├── .env.example              ✓
└── README.md                 ✓
```

### Core Library Files (Stubs Ready)

| File | Purpose | Status |
|------|---------|--------|
| `src/lib/google.ts` | Google Drive API + Activity API | ✓ Written |
| `src/lib/proof-engine.ts` | Proof calculation (pure functions) | ✓ Written |
| `src/lib/supabase.ts` | Database client (server + browser) | ✓ Written |
| `src/types/database.ts` | TypeScript schema types | ✓ Written |
| `supabase/migrations/001_init_schema.sql` | Database schema | ✓ Written |

### CI/CD Pipeline

| Workflow | Triggers | Status |
|----------|----------|--------|
| `ci.yml` | Every push, PR | ✓ Configured |
| `deploy.yml` | Merge to main | ✓ Configured |

**Gates:**
- Fredo secret scan (trufflehog)
- npm audit (critical vulnerabilities)
- Unit tests (80%+ coverage on proof-engine.ts)
- Build succeeds

---

## What You Need to Do (T-001)

### 1. Google Cloud Console
Go to: `console.cloud.google.com`

**Create Project:**
- Name: "Oryx"
- Note the Project ID

**Enable APIs:**
1. Google Drive API v3
2. Google Drive Activity API v2

**Create OAuth 2.0 Credentials:**
- Type: Web application
- Name: "Oryx OAuth"

**Authorized Redirect URIs:**
```
http://localhost:3000/api/auth/callback/google
https://staging.projectoryx.com/api/auth/callback/google
https://projectoryx.com/api/auth/callback/google
```

**OAuth Consent Screen:**
- User Type: External
- App Name: Oryx
- Support Email: your email
- Scopes:
  - `openid`
  - `email`
  - `profile`
  - `https://www.googleapis.com/auth/drive.readonly`
  - `https://www.googleapis.com/auth/drive.activity.readonly`
- Test Users: Add your email (for testing mode during verification wait)

**Submit for Verification:**
- Click "Publish App" → Submit for verification
- This takes 7-10 business days — do this NOW
- You can continue development in Testing mode while waiting

**Copy These Values:**
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

---

### 2. Supabase (T-003 — Can Do in Parallel)

Go to: `supabase.com`

**Create Project:**
- Name: "oryx-v1"
- Region: EU West (closest to target users)
- Database Password: [save securely]

**Run Migration:**
- Go to SQL Editor
- Paste: `supabase/migrations/001_init_schema.sql`
- Run

**Copy These Values:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

---

### 3. Generate NEXTAUTH_SECRET

Run locally:
```bash
openssl rand -base64 32
```

Copy the output.

---

### 4. Sentry (Optional for V1 — Can Skip Until Later)

Go to: `sentry.io`

**Create Project:**
- Platform: Next.js
- Name: "Oryx V1"

**Copy:**
- `SENTRY_DSN`

---

## When T-001 Is Complete

Reply with:
```
T-001 complete — credentials ready
```

I will then:

1. Create `.env.local` with your credentials
2. Run `npm install`
3. Verify `npm run dev` starts
4. Verify `npm run build` passes
5. Create Vercel project and connect GitHub repo
6. Deploy first commit to staging

**Estimated time for T-002 execution:** 5-10 minutes

---

## Domain Setup (T-001 Side Task)

**Production Domain:** `projectoryx.com`

**Action Required:**
- Ensure domain is registered and accessible
- Point to Vercel nameservers (will provide after Vercel project creation)
- Or configure CNAME if using external DNS

**Staging Domain:** `staging.projectoryx.com`
- Will be configured automatically via Vercel preview deployments

---

## Risks & Notes

**R-01 (High):** OAuth consent verification takes 7-10 days.
- Mitigation: Submit NOW. Develop in Testing mode (up to 100 test users).

**R-02 (Medium):** Drive Revisions API returns sparse data for uploaded documents.
- Mitigation: UI will show clear message when revision history is limited.

**R-03 (Medium):** OAuth scope `drive.activity.readonly` may cause drop-off.
- Mitigation: Clear consent screen description: "To show when you worked on your document."

---

**Status:** Awaiting T-001 completion.
**Next Task:** T-002 (Repository scaffold and environment setup)

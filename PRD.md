# PROJECT REQUIREMENTS DOCUMENT

# Owner: Michael (intake) → Seun (approval) → The Don (execution)

# Project: Oryx V1 — Work Proof Platform

-----

## DOCUMENT STATUS

```
Status:        APPROVED — build begins
Input source:  super-prompt
Project type:  full-stack
Date created:  2026-05-22
Last updated:  2026-05-22
PRD version:   1.2
```

-----

## OPEN QUESTIONS

|Question                                                           |Owner|Needed by                   |Answer                                                                      |
|-------------------------------------------------------------------|-----|----------------------------|----------------------------------------------------------------------------|
|What is the production domain name?                                |Seun |Before T-001                |**projectoryx.com**                                                         |
|Does Seun have an active Google Cloud billing account ready to use?|Seun |Before T-001                |**Yes — billing account active**                                            |
|Is V1 completely free — no payment collection at launch?           |Seun |Before T-010                |**Yes — free at launch**                                                    |
|Are privacy policy and terms of service documents available?       |Seun |Before production deployment|**Will be drafted. Placeholder pages at /privacy and /terms before launch.**|

*All open questions resolved. PRD is ready for Section 1 and beyond.*

-----

## SECTION 1 — PROJECT OVERVIEW

### 1.1 One-line description

Oryx is a work provenance platform that generates verifiable proof that a specific human iteratively created a specific document.

### 1.2 Problem statement

In a world where AI can generate polished, professional content in seconds, employers, publishers, grant makers, and consulting clients have no reliable way to verify that the deliverables they paid for were actually produced by the human they hired. Existing AI detection tools attempt to classify outputs — they analyse the final document and guess whether AI was involved. This is fundamentally unreliable and increasingly easy to circumvent.

The real problem is upstream: there is no record of the work process. A human writing an article over three days leaves a forensic trail — drafts, revisions, edits, sessions across multiple days. An AI-generated document appears fully formed in a single event. This trail exists inside Google Workspace and Microsoft Office already — it is simply inaccessible in a shareable, trustworthy format.

Without Oryx: funders pay for human expertise and receive outputs with no evidence of the work behind them. Fraud is structurally undetectable. Trust erodes. The incentive to fake work grows as AI gets cheaper and better.

With Oryx: a worker connects their Google account, selects a document, and generates a Work Proof — a verifiable, shareable credential pulled directly from Google’s servers showing the real creation process. The employer or client receives a link. They open it without an account and see the evidence. The worker cannot fabricate the data because Oryx retrieves it from Google, not from the worker.

### 1.3 Who uses this

**Primary user — Knowledge Worker**
Role: writer, researcher, consultant, remote contractor, grant recipient
Context: has completed work and needs to prove it was genuinely done by them
Technical ability: non-technical, comfortable with Google sign-in
Goal: generate a Work Proof and share the link with their client or employer

**Secondary user — Verifier (employer, publisher, client, grant maker)**
Role: paying party who needs to confirm the work was genuinely done
Context: receives a link, opens it in a browser, needs to understand it immediately
Technical ability: non-technical
Goal: confirm the work proof is legitimate with no friction
Note: Verifiers do not create accounts. They only access the public verification page.

**Admin user — Seun**
Role: platform operator
Access: Supabase dashboard, Vercel dashboard, full production access
Context: monitors usage, handles support, approves deployments

### 1.4 Why now

AI content generation has crossed a threshold in 2025-2026 where the default assumption among sophisticated employers and clients is shifting — they can no longer trust that submitted work is human-generated without evidence. The problem is acute and growing. No current tool provides verifiable process proof. AI detection tools are demonstrably unreliable and are being abandoned by institutions that adopted them. The market is open for a provenance-based approach. The Google Docs revision API has existed for years — the gap is not technical capability but product execution.

### 1.5 Success definition

|Metric                                                          |Target                                             |How measured               |
|----------------------------------------------------------------|---------------------------------------------------|---------------------------|
|Work Proofs generated                                           |10 within 30 days of launch                        |Supabase proof count       |
|Proof verification events (verifiers opening links)             |3 per proof on average within 30 days              |ProofEvent table view_count|
|Paying customer or signed LOI                                   |1 within 60 days of launch                         |Seun records in Supabase   |
|Time to generate a proof (from document selection to link ready)|Under 15 seconds for documents with < 500 revisions|Manual timing on staging   |
|Proof page load for verifier                                    |Under 3 seconds on 3G                              |Lighthouse + manual test   |

-----

## SECTION 2 — SCOPE

### 2.1 In scope — P0 (must have for launch)

- [ ] Google OAuth 2.0 — user signs in with Google Workspace account
- [ ] Document selector — authenticated user browses and selects a document from their Google Drive
- [ ] Revision history extraction — system retrieves revision data via Google Drive Revisions API v3
- [ ] Edit activity extraction — system retrieves granular edit events via Google Drive Activity API v2
- [ ] Proof calculation engine — system computes: revision count, time span, active days, active sessions, unique editors, primary editor, edit frequency pattern
- [ ] Work Proof display — rendered page showing proof data in a trustworthy, immediately understandable format
- [ ] Shareable verification link — unique URL per proof, publicly accessible, no login required for verifier
- [ ] Proof storage — generated proofs persisted in Supabase with integrity hash
- [ ] Landing page — explains Oryx, how it works, why to trust it, CTA to sign in with Google

### 2.2 In scope — P1 (should have, not blocking)

- [ ] Proof history dashboard — authenticated user views their previously generated proofs
- [ ] Proof view counter — proof page shows how many times the link has been opened
- [ ] Proof deactivation — worker can deactivate a proof link so it no longer resolves
- [ ] Document search — search documents by name in the selector (instead of scrolling all Drive files)

### 2.3 In scope — P2 (nice to have)

- [ ] Proof expiry — worker sets an expiry date on a proof link
- [ ] PDF export — download the Work Proof as a PDF
- [ ] Email link — send the proof link via email from within Oryx

### 2.4 Explicitly out of scope

- Microsoft Office / OneDrive integration — not in V1. Added in V2 only after Google integration is proven.
- Source and URL access verification (zkTLS via Reclaim Protocol) — not in V1. Core research provenance feature, added in V2.
- On-chain attestation (EAS, Base, or any blockchain) — not in V1. Trustless verification layer for Web3 customers, added in V3.
- Payment and billing — not in V1. V1 is free to use. Monetisation begins in V2.
- Team or organisation accounts — not in V1. Single-user only.
- API for third-party access — not in V1. B2B SaaS API layer is a V2 product line.
- Mobile application — not in V1. Web only.
- Notion, Dropbox, Confluence, or any integration other than Google — not in V1.
- AI detection scoring — not in scope at any version. Different product, different approach. Oryx does not classify outputs.
- Admin dashboard — not in V1. Seun uses Supabase directly.

### 2.5 Future considerations

- Microsoft Office provenance will be required to cover the majority of enterprise knowledge workers. OneDrive has equivalent revision APIs.
- Source access verification (proving a researcher visited specific URLs) is the second core proof type. Reclaim Protocol (zkTLS) is the build path.
- On-chain attestation (EAS on Base) enables trustless verification for Web3 customers and opens the second customer segment.
- Employer-initiated verification requests: instead of the worker sharing a link, the employer sends a verification request and the worker authorises it. This is the natural B2B workflow.
- Organisation accounts with multiple workers under a single employer contract.
- Webhook notifications when a proof link is opened (employer gets notified on verification).

-----

## SECTION 3 — USER STORIES

### Story 1: Sign in with Google

**As a** knowledge worker
**I want to** sign in to Oryx using my Google account
**So that** Oryx can securely access my Google Drive documents without me sharing credentials

**Priority:** P0
**Estimate:** M (1-3 days)

**Acceptance criteria:**

- [ ] Worker visits the landing page and clicks “Sign in with Google”
- [ ] Google OAuth consent screen displays, listing the permissions Oryx requests (Drive read-only)
- [ ] Worker grants consent and is redirected to the Oryx dashboard
- [ ] Worker’s name and email are visible in the dashboard header
- [ ] Session persists across page refreshes (JWT cookie, 30-day expiry)
- [ ] Worker can sign out and session is cleared
- [ ] If worker denies consent, they are returned to the landing page with an explanatory message
- [ ] OAuth tokens are stored server-side only — never exposed to the browser

**Out of scope for this story:**

- Non-Google sign-in methods
- Organisation-level OAuth (domain-wide delegation)

-----

### Story 2: Select a document

**As a** knowledge worker
**I want to** browse and select a document from my Google Drive
**So that** I can generate a Work Proof for the document I want to verify

**Priority:** P0
**Estimate:** M (1-3 days)

**Acceptance criteria:**

- [ ] Dashboard displays a list of the worker’s Google Drive documents (Docs, Sheets, Slides)
- [ ] Each document shows: name, last modified date, document type icon
- [ ] Documents are sorted by most recently modified first
- [ ] Worker can click a document to select it
- [ ] Selected document is visually highlighted
- [ ] A “Generate Proof” button becomes active when a document is selected
- [ ] If the worker has no Drive documents, an empty state is shown with guidance
- [ ] The document list loads within 5 seconds of the dashboard opening

**Out of scope for this story:**

- Pagination beyond the initial 50 most recently modified documents (P1 search covers this)
- Shared drives or documents the worker does not own
- Documents that are not Google Workspace native types (PDFs, images, etc.)

-----

### Story 3: Generate a Work Proof

**As a** knowledge worker
**I want to** generate a Work Proof for my selected document
**So that** I have verifiable, shareable evidence that I created the document through a genuine work process

**Priority:** P0
**Estimate:** L (3-5 days)

**Acceptance criteria:**

- [ ] Worker clicks “Generate Proof” with a document selected
- [ ] A loading state is displayed while Oryx retrieves data from Google
- [ ] Proof generation completes within 15 seconds for documents with fewer than 500 revisions
- [ ] The generated proof displays on screen with all of the following data points:
  - Document name
  - Revision count (total number of distinct save events)
  - Time span (human-readable: “Created over 4 days”, “Created over 3 weeks”)
  - First edit timestamp
  - Most recent edit timestamp
  - Number of active working sessions
  - Number of calendar days with edit activity
  - Primary editor (email address pulled from Google, not self-reported)
  - Additional editors count (if any)
  - Edit frequency visualisation (visual timeline showing when edits occurred)
  - Oryx verification statement: “This data was retrieved directly from Google’s servers by Oryx on [date/time]”
- [ ] If the document has fewer than 3 revisions (insufficient history to generate a meaningful proof), the system displays a clear explanation and does not generate a proof
- [ ] If the Google API returns an error, the system displays a human-readable error and does not create a broken proof record
- [ ] A proof record is written to Supabase with a SHA-256 integrity hash of the proof data
- [ ] A unique shareable verification URL is generated and displayed to the worker

**Out of scope for this story:**

- Microsoft Office documents
- Documents the worker did not create (shared documents where they are not the primary editor)

-----

### Story 4: Share the Work Proof

**As a** knowledge worker
**I want to** copy a shareable link to my Work Proof
**So that** I can send it to my employer or client for verification

**Priority:** P0
**Estimate:** S (< 1 day)

**Acceptance criteria:**

- [ ] The verification URL is displayed prominently after proof generation
- [ ] A “Copy link” button copies the URL to the clipboard
- [ ] A visual confirmation (“Copied!”) appears for 2 seconds after clicking
- [ ] The URL format is: [domain]/verify/[proof-id] where proof-id is a UUID
- [ ] The link resolves to the public verification page without requiring sign-in

**Out of scope for this story:**

- Sending the link via email from within Oryx (P2)
- Social sharing buttons

-----

### Story 5: Verify a Work Proof (as verifier)

**As a** verifier (employer, publisher, client)
**I want to** open a shared Work Proof link and view the verified proof
**So that** I can confirm the work was genuinely created by the person who shared it

**Priority:** P0
**Estimate:** M (1-3 days)

**Acceptance criteria:**

- [ ] Verifier opens the URL in any browser without creating an account
- [ ] Page loads and displays the full Work Proof within 3 seconds on a 3G connection
- [ ] The proof displays all data points listed in Story 3 acceptance criteria
- [ ] The page clearly states that the data was retrieved by Oryx from Google’s servers — not submitted by the worker
- [ ] The page displays the date and time Oryx retrieved the data
- [ ] A proof integrity statement is shown: “[Document name] — proof generated by Oryx on [date]. Data source: Google Drive API.”
- [ ] If the proof ID does not exist in the database, a 404 page is shown
- [ ] If the proof has been deactivated by the worker, a “This proof is no longer active” message is shown
- [ ] Every view of the verification page is logged as a ProofEvent in Supabase
- [ ] The verifier is not prompted to create an account at any point on the verification page

**Out of scope for this story:**

- Verifier authentication or accounts
- Verifier leaving comments or feedback on the proof

-----

### Story 6: Understand Oryx before signing up

**As a** potential user (worker or verifier)
**I want to** understand what Oryx does, how it works, and why I should trust it
**So that** I can make an informed decision to sign up or share the link with my team

**Priority:** P0
**Estimate:** M (1-3 days)

**Acceptance criteria:**

- [ ] Landing page loads within 3 seconds on a 3G connection
- [ ] Landing page explains in plain language: what Oryx is, the problem it solves, how it works (3-step process), why the data can be trusted
- [ ] Landing page includes a prominent CTA to sign in with Google
- [ ] Landing page does not mention blockchain, Web3, crypto, or tokens
- [ ] Landing page is fully readable on mobile (375px viewport minimum)
- [ ] Lighthouse Accessibility score ≥ 90 on landing page
- [ ] Privacy policy link is present in the footer

**Out of scope for this story:**

- Pricing page (V1 is free)
- Blog or content marketing
- Testimonials or social proof (added after first users)

-----

## SECTION 4 — TECHNICAL REQUIREMENTS

### 4.1 Functional requirements

|ID   |Requirement                                                                                                                                                                                                                                                                   |Priority|Story  |
|-----|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------|-------|
|FR-01|System authenticates users via Google OAuth 2.0. OAuth tokens stored server-side only.                                                                                                                                                                                        |P0      |Story 1|
|FR-02|System lists user’s Google Drive documents (Docs, Sheets, Slides) sorted by modified date descending. Maximum 50 results on initial load.                                                                                                                                     |P0      |Story 2|
|FR-03|System retrieves revision list for a selected document via Google Drive Revisions API v3 (`files.revisions.list`). Handles pagination to retrieve all revisions.                                                                                                              |P0      |Story 3|
|FR-04|System retrieves edit activity for a selected document via Google Drive Activity API v2 (`activity.query`). Returns editor identity and timestamps.                                                                                                                           |P0      |Story 3|
|FR-05|System calculates proof statistics from raw API data: revision count, first edit timestamp, last edit timestamp, time span in days, active days count, active sessions count, unique editor count, primary editor email, edit frequency pattern (array of session timestamps).|P0      |Story 3|
|FR-06|System generates a SHA-256 hash of the proof data before storage. Hash stored in the proof record.                                                                                                                                                                            |P0      |Story 3|
|FR-07|System writes proof record to Supabase `proofs` table on successful generation.                                                                                                                                                                                               |P0      |Story 3|
|FR-08|System generates a unique UUID-based verification URL for each proof.                                                                                                                                                                                                         |P0      |Story 4|
|FR-09|System serves the public verification page without authentication. Retrieves proof from Supabase by UUID.                                                                                                                                                                     |P0      |Story 5|
|FR-10|System logs a ProofEvent record of type `generated` when a proof is created.                                                                                                                                                                                                  |P0      |Story 3|
|FR-11|System logs a ProofEvent record of type `viewed` with hashed IP when the verification page is loaded.                                                                                                                                                                         |P0      |Story 5|
|FR-12|System returns a human-readable error and does not create a proof record if the document has fewer than 3 revisions.                                                                                                                                                          |P0      |Story 3|
|FR-13|System returns a 404 response when a verification URL contains a proof ID that does not exist in the database.                                                                                                                                                                |P0      |Story 5|
|FR-14|System serves a landing page accessible without authentication.                                                                                                                                                                                                               |P0      |Story 6|

### 4.2 Non-functional requirements

**Performance:**

- Page load (landing, dashboard, verification): < 3 seconds on simulated 3G (Lighthouse)
- Proof generation (document selection to shareable link): < 15 seconds for documents with < 500 revisions
- API response for document list: < 3 seconds
- Lighthouse score: Performance ≥ 80, Accessibility ≥ 90 on all pages

**Offline capability:**

- [x] Not required

**Security:**

- Authentication: Required for proof generation and dashboard. Not required for verification page.
- Authorization levels: authenticated worker (own proofs only), public verifier (read-only via UUID link)
- Data sensitivity: medium — email addresses and document names are PII
- Compliance: GDPR (EU users likely), NDPR (Nigerian operator)
- Specific requirements:
  - Google OAuth tokens must never be exposed to the browser or logged
  - Supabase service role key must never be used client-side
  - All routes except `/` and `/verify/[id]` must require authentication
  - IP addresses logged in ProofEvent must be hashed (SHA-256) before storage

**Availability:**

- Uptime target: 99% (Vercel provides this by default)
- Acceptable downtime window: None defined — Vercel handles this
- Data backup frequency: Supabase daily automatic backups (free tier)

**Scalability:**

- Expected users at launch: 10-50
- Expected users in 12 months: 1,000-5,000
- Data volume at launch: < 100 proof records
- Data volume in 12 months: < 50,000 proof records. Supabase free tier (500MB) is sufficient through this range.

### 4.3 Integration requirements

|Service                     |Purpose                                  |Direction|Auth method                                                |Risk                                                                    |
|----------------------------|-----------------------------------------|---------|-----------------------------------------------------------|------------------------------------------------------------------------|
|Google OAuth 2.0            |User authentication                      |Outbound |OAuth 2.0 client credentials                               |Medium — consent screen verification takes 7+ days                      |
|Google Drive API v3         |Document listing + revision history      |Outbound |OAuth access token (user-delegated)                        |Medium — API quota limits; revision data may be sparse for old documents|
|Google Drive Activity API v2|Granular edit events + editor identity   |Outbound |OAuth access token (user-delegated)                        |Medium — same as above                                                  |
|Supabase                    |PostgreSQL database, auth session storage|Both     |Service role key (server-side), anon key (client-side read)|Low                                                                     |
|Vercel                      |Hosting, deployment, CDN                 |Outbound |Vercel CLI + GitHub Actions                                |Low                                                                     |

### 4.4 Constraints

- Budget: $1,000 total. Infrastructure must not exceed $50/month. Vercel free tier + Supabase free tier are the baseline — no paid tiers unless usage demands it.
- Google OAuth consent screen verification: submitting for production verification can take 7-10 business days. Must be submitted on Day 1. Development uses testing mode (up to 100 test users) in the interim.
- Google Drive Revisions API limitation: revision data is only available for changes made after a document is created. Uploaded documents (e.g. Word files converted to Docs) may have no revision history for the content that was there at upload. This must be handled gracefully with a user-visible message.
- No separate backend server: V1 uses Next.js API routes exclusively. NestJS is not used in V1 — it adds hosting cost and complexity that is not warranted at this scale.
- No blockchain: V1 is a traditional web application. No wallets, no smart contracts, no on-chain operations.

-----

## SECTION 5 — TECH STACK DECISION

### 5.1 Recommended stack

|Layer                     |Technology             |Version|Reason                                                                                                                                  |
|--------------------------|-----------------------|-------|----------------------------------------------------------------------------------------------------------------------------------------|
|Frontend                  |Next.js (App Router)   |14.x   |Family standard. Server components reduce client bundle. Server-side rendering for verification page is critical for SEO and load speed.|
|Styling                   |Tailwind CSS           |3.x    |Family standard. Rapid iteration. No context-switching.                                                                                 |
|Auth                      |NextAuth.js            |4.x    |Google OAuth provider built-in. Integrates natively with Next.js App Router. Handles token refresh automatically.                       |
|Google API client         |googleapis (official)  |latest |Official Google Node.js client. Handles OAuth token injection, pagination, and type safety across Drive and Activity APIs.              |
|Database client           |@supabase/supabase-js  |2.x    |Family standard. Lightweight. Works in both server components and API routes.                                                           |
|Database                  |Supabase (PostgreSQL)  |managed|Family standard. Free tier is sufficient for V1. Row-level security for proof access control.                                           |
|Deployment                |Vercel                 |latest |Family standard. Free tier. Zero-config Next.js deployment.                                                                             |
|CI                        |GitHub Actions         |latest |Family standard.                                                                                                                        |
|Error tracking            |Sentry                 |latest |Free tier (5,000 errors/month). Essential for catching production issues post-launch.                                                   |
|Testing (unit/integration)|Vitest                 |latest |Family standard.                                                                                                                        |
|Testing (E2E)             |Playwright             |latest |Family standard.                                                                                                                        |
|Hashing                   |Node.js built-in crypto|—      |SHA-256 for proof integrity and IP hashing. No external dependency needed.                                                              |

**Approved stack used:** YES

### 5.2 Alternatives considered and rejected

|Alternative              |Why rejected                                                                                                                                     |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
|NestJS (separate backend)|Overkill for V1. API complexity does not justify a separate server. Adds Railway/Fly.io hosting cost. Switch to NestJS in V2 if scale demands it.|
|Prisma ORM               |Supabase client is sufficient for V1 data model. Prisma adds build-time complexity and a migration layer that is unnecessary at this stage.      |
|Clerk (auth)             |More opinionated than NextAuth. Costs money at scale. NextAuth with Google provider covers all V1 requirements at zero cost.                     |
|Firebase                 |Not the Family standard. Would require learning new SDK. Supabase provides equivalent capability with better PostgreSQL support.                 |
|tRPC                     |Adds complexity without benefit at this API surface area. Plain API routes are sufficient and easier for the Don to reason about.                |

### 5.3 Stack decision status

- [x] Clemenza proposed
- [x] The Don reviewed
- [x] **Seun approved — date: 2026-05-22**

*Build does not start until Seun approves the stack.*

-----

## SECTION 6 — ARCHITECTURE

### 6.1 System overview

```
  Browser (Worker)                    Browser (Verifier)
       |                                     |
       | HTTPS                               | HTTPS (no auth)
       |                                     |
  ┌────────────────────────────────────────────────────┐
  │              Next.js App (Vercel)                  │
  │                                                    │
  │  Pages:                                            │
  │  /                    → Landing page               │
  │  /dashboard           → Document selector          │
  │  /dashboard/proof/new → Proof generator            │
  │  /verify/[id]         → Public verification page   │
  │                                                    │
  │  API Routes:                                       │
  │  /api/auth/[...nextauth]  → Google OAuth (NextAuth)│
  │  /api/documents           → List Drive documents   │
  │  /api/proofs              → Generate + list proofs │
  │  /api/verify/[id]         → Public proof retrieval │
  └──────────────┬────────────────────────┬───────────┘
                 │                        │
    ┌────────────▼────────┐    ┌──────────▼──────────┐
    │   Google APIs       │    │   Supabase           │
    │                     │    │   (PostgreSQL)       │
    │ - OAuth 2.0         │    │                     │
    │ - Drive API v3      │    │ Tables:              │
    │   (revisions, list) │    │ - users              │
    │ - Drive Activity v2 │    │ - proofs             │
    │   (edit events)     │    │ - proof_events       │
    └─────────────────────┘    └─────────────────────┘
```

### 6.2 Key components

**Component: Auth Layer (NextAuth.js)**

- Owns: Google OAuth flow, session management, JWT token storage and refresh, protecting authenticated routes
- Does not own: document access logic, proof generation, database writes beyond session
- Interacts with: Google OAuth 2.0 endpoints, Supabase (stores user record on first sign-in)
- Technology: NextAuth.js 4.x with Google provider

**Component: Google API Service (`/lib/google.ts`)**

- Owns: all calls to Google Drive API v3 and Google Drive Activity API v2, response normalisation, pagination handling, error classification
- Does not own: proof calculation logic, storage, display
- Interacts with: Google APIs (outbound), Proof Engine (provides normalised data), API routes (called by)
- Technology: `googleapis` npm package, OAuth2 client initialised with user access token from NextAuth session

**Component: Proof Engine (`/lib/proof-engine.ts`)**

- Owns: all calculation logic — revision stats, session detection, active days count, edit frequency pattern array, primary editor identification, integrity hash generation
- Does not own: Google API calls, storage, or any I/O
- Interacts with: Google API Service (receives normalised data), API route /api/proofs (called by, returns proof data)
- Technology: Pure TypeScript functions. No external dependencies. Fully unit-testable in isolation.

**Component: Supabase Data Layer (`/lib/supabase.ts`)**

- Owns: all database reads and writes — users, proofs, proof_events
- Does not own: business logic, calculation, API calls
- Interacts with: API routes, server components
- Technology: @supabase/supabase-js v2. Service role key on server, anon key on client.

**Component: Verification Page (`/app/verify/[id]/page.tsx`)**

- Owns: rendering a Work Proof to an unauthenticated verifier. Server-side data fetch. ProofEvent logging.
- Does not own: proof generation, authentication
- Interacts with: Supabase (read proof by ID), proof_events table (writes view event)
- Technology: Next.js server component. No client-side JavaScript required for core display.

### 6.3 Data flow

**Flow: Worker generates a Work Proof**

1. Worker signs in → NextAuth stores Google access token in encrypted server-side session
1. Worker visits /dashboard → API route `/api/documents` calls Google Drive API with user token → returns document list
1. Worker selects a document → clicks “Generate Proof”
1. Frontend POSTs `{ documentId, documentName, documentUrl }` to `/api/proofs`
1. API route retrieves user’s Google access token from session
1. Google API Service calls `files.revisions.list` (Drive API) — paginates to retrieve all revisions
1. Google API Service calls `activity.query` (Drive Activity API) — retrieves edit events with editor identities
1. Proof Engine receives normalised data → calculates all proof statistics → generates SHA-256 integrity hash
1. API route writes proof record to Supabase `proofs` table
1. API route writes ProofEvent `generated` to Supabase `proof_events` table
1. API route returns `{ proofId, verificationUrl, proofData }` to frontend
1. Frontend displays Work Proof and shareable URL

**Flow: Verifier opens a Work Proof link**

1. Verifier opens `[domain]/verify/[uuid]` in browser
1. Next.js server component fetches proof record from Supabase by UUID
1. If not found → render 404 page
1. If found and active → render Work Proof page server-side
1. Server writes ProofEvent `viewed` with hashed IP to `proof_events`
1. Page served to verifier — no client-side data fetching, no auth, no cookies

### 6.4 Architecture decision status

- [x] Clemenza drafted
- [x] The Don reviewed
- [x] **Seun approved — date: 2026-05-22**

*Build does not start until Seun approves the architecture.*

-----

## SECTION 7 — DATA MODEL

### 7.1 Core entities

**Entity: User**

```
id:               uuid, primary key, default gen_random_uuid()
google_id:        text, unique, not null
email:            text, unique, not null
name:             text, not null
avatar_url:       text, nullable
created_at:       timestamptz, default now()
updated_at:       timestamptz, default now()
```

**Entity: Proof**

```
id:               uuid, primary key, default gen_random_uuid()
user_id:          uuid, not null, references users(id) on delete cascade
document_id:      text, not null  -- Google Drive file ID
document_name:    text, not null
document_url:     text, not null  -- Google Drive webViewLink
generated_at:     timestamptz, not null, default now()
revision_count:   integer, not null
first_edit_at:    timestamptz, not null
last_edit_at:     timestamptz, not null
time_span_days:   integer, not null  -- days between first and last edit
active_days:      integer, not null  -- distinct calendar days with edit activity
active_sessions:  integer, not null  -- distinct editing sessions detected
unique_editors:   integer, not null
primary_editor:   text, not null     -- email from Google, not self-reported
edit_pattern:     jsonb, not null    -- array of { start: timestamp, end: timestamp, revisions: int }
proof_hash:       text, not null     -- SHA-256 of deterministic JSON of proof fields
is_active:        boolean, not null, default true
expires_at:       timestamptz, nullable  -- null = permanent
view_count:       integer, not null, default 0
```

**Entity: ProofEvent**

```
id:               uuid, primary key, default gen_random_uuid()
proof_id:         uuid, not null, references proofs(id) on delete cascade
event_type:       text, not null  -- 'generated' | 'viewed' | 'shared' | 'deactivated'
ip_hash:          text, nullable  -- SHA-256 of IP, for deduplication only
user_agent:       text, nullable
created_at:       timestamptz, not null, default now()
```

**Relationships:**

- User has many Proofs (one-to-many, cascade delete)
- Proof has many ProofEvents (one-to-many, cascade delete)

**Indexes:**

```sql
CREATE INDEX idx_proofs_user_id ON proofs(user_id);
CREATE INDEX idx_proofs_document_id ON proofs(document_id);
CREATE INDEX idx_proof_events_proof_id ON proof_events(proof_id);
CREATE INDEX idx_proof_events_created_at ON proof_events(created_at);
```

**Row-level security:**

```sql
-- proofs: worker can only read/write their own proofs
ALTER TABLE proofs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own proofs"
  ON proofs FOR ALL
  USING (auth.uid() = user_id);

-- proof_events: service role only (no direct client access)
ALTER TABLE proof_events ENABLE ROW LEVEL SECURITY;
-- No client policies — all writes go through server-side API routes using service role key

-- Verification page reads proofs via service role (server-side) — no RLS bypass needed client-side
```

### 7.2 Data sensitivity classification

|Entity      |Sensitivity|Reason                                                                        |Handling                                                  |
|------------|-----------|------------------------------------------------------------------------------|----------------------------------------------------------|
|users       |Medium     |Email address and Google identity are PII                                     |GDPR/NDPR subject access rights apply. Deletion cascades. |
|proofs      |Medium     |document_name and primary_editor are PII. edit_pattern reveals work behaviour.|Accessible only by owner (RLS) or verifier with UUID link.|
|proof_events|Low        |IP is hashed before storage. No direct PII.                                   |Retained for analytics.                                   |

### 7.3 Migration strategy

- Source data: none — fresh project, no existing data
- Migration approach: Supabase migration files applied via CLI in CI/CD
- Rollback plan: Supabase migration rollback via `supabase db reset` on staging. Production: manual rollback by Seun if needed.
- Client sign-off required: NO

-----

## SECTION 8 — API DESIGN

### 8.1 API overview

- Base URL staging: `https://staging.projectoryx.com/api`
- Base URL production: `https://projectoryx.com/api`
- Authentication: NextAuth session cookie (httpOnly JWT). All protected routes validate session server-side.
- Rate limiting: 60 requests/minute per authenticated user (Next.js middleware). 30 requests/minute per IP for public routes.
- Versioning: No versioning in V1. Breaking changes require a new major release.

### 8.2 Endpoints

**GET /api/documents**

- Purpose: List the authenticated user’s Google Drive documents
- Auth required: YES
- Query params: `search` (string, optional — filters by document name)
- Response 200:
  
  ```json
  {
    "documents": [
      {
        "id": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms",
        "name": "Q1 Research Report",
        "mimeType": "application/vnd.google-apps.document",
        "modifiedTime": "2026-05-20T14:23:00Z",
        "webViewLink": "https://docs.google.com/document/d/..."
      }
    ]
  }
  ```
- Error responses:
  - 401: Not authenticated
  - 502: Google API error (message included)

-----

**POST /api/proofs**

- Purpose: Generate a Work Proof for a specified Google Drive document
- Auth required: YES
- Request body:
  
  ```json
  {
    "documentId": "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms",
    "documentName": "Q1 Research Report",
    "documentUrl": "https://docs.google.com/document/d/..."
  }
  ```
- Response 201:
  
  ```json
  {
    "proofId": "a3f8c9d2-...",
    "verificationUrl": "https://[domain]/verify/a3f8c9d2-...",
    "proof": {
      "documentName": "Q1 Research Report",
      "revisionCount": 47,
      "firstEditAt": "2026-05-01T09:12:00Z",
      "lastEditAt": "2026-05-20T14:23:00Z",
      "timeSpanDays": 19,
      "activeDays": 8,
      "activeSessions": 12,
      "uniqueEditors": 1,
      "primaryEditor": "worker@example.com",
      "editPattern": [...]
    }
  }
  ```
- Error responses:
  - 400: Missing or invalid documentId
  - 401: Not authenticated
  - 422: Insufficient revision history (fewer than 3 revisions). Body includes `{ "error": "INSUFFICIENT_HISTORY", "message": "This document has fewer than 3 revisions..." }`
  - 502: Google API error

-----

**GET /api/proofs**

- Purpose: List all proofs generated by the authenticated user
- Auth required: YES
- Response 200:
  
  ```json
  {
    "proofs": [
      {
        "id": "a3f8c9d2-...",
        "documentName": "Q1 Research Report",
        "generatedAt": "2026-05-22T10:00:00Z",
        "revisionCount": 47,
        "timeSpanDays": 19,
        "isActive": true,
        "viewCount": 3,
        "verificationUrl": "https://[domain]/verify/a3f8c9d2-..."
      }
    ]
  }
  ```
- Error responses:
  - 401: Not authenticated

-----

**GET /api/verify/[id]**

- Purpose: Retrieve a proof record for public display on the verification page
- Auth required: NO
- Response 200:
  
  ```json
  {
    "proof": {
      "id": "a3f8c9d2-...",
      "documentName": "Q1 Research Report",
      "generatedAt": "2026-05-22T10:00:00Z",
      "revisionCount": 47,
      "firstEditAt": "2026-05-01T09:12:00Z",
      "lastEditAt": "2026-05-20T14:23:00Z",
      "timeSpanDays": 19,
      "activeDays": 8,
      "activeSessions": 12,
      "uniqueEditors": 1,
      "primaryEditor": "worker@example.com",
      "editPattern": [...],
      "proofHash": "sha256:...",
      "viewCount": 4
    }
  }
  ```
- Error responses:
  - 404: Proof ID not found or proof is not active

**Side effect:** Increments `proofs.view_count` and writes a `ProofEvent` of type `viewed` with hashed IP.

### 8.3 API documentation

- Format: Inline JSDoc comments in API route files. OpenAPI spec to be generated in V2 if B2B API is added.
- Location: /docs in repo (README level only for V1)
- Auto-generated: NO (V1)

-----

## SECTION 9 — TESTING STRATEGY

### 9.1 Test coverage targets

- Unit tests: 80% minimum on the Proof Engine (`/lib/proof-engine.ts`)
- Integration tests: all API routes covered with mocked Google APIs and Supabase
- E2E tests: all P0 user stories (Stories 1-6)

### 9.2 Testing framework

- Unit / Integration: Vitest
- E2E: Playwright
- API: Supertest (via Vitest for API route testing)

### 9.3 Test categories and ownership

|Category   |What it covers                                                                                       |Who writes|When                                 |
|-----------|-----------------------------------------------------------------------------------------------------|----------|-------------------------------------|
|Unit       |Proof Engine functions: revision counting, session detection, active days, time span, hash generation|Clemenza  |Alongside proof engine implementation|
|Integration|API routes: `/api/documents`, `/api/proofs`, `/api/verify/[id]` with mocked Google APIs and Supabase |Clemenza  |After each API route                 |
|E2E        |All P0 user stories end-to-end on staging                                                            |Clemenza  |Before staging review                |
|Security   |Fredo scans: secrets, headers, dependencies                                                          |Fredo     |Pre-push + post-staging              |

### 9.4 CI gates (GitHub Actions)

- [ ] All unit tests pass
- [ ] All integration tests pass
- [ ] Proof Engine coverage ≥ 80%
- [ ] Fredo security scan: CLEAR
- [ ] Lighthouse: Performance ≥ 80
- [ ] Lighthouse: Accessibility ≥ 90
- [ ] No critical npm audit findings

### 9.5 Definition of done — feature level

A feature is done when:

- [ ] Code written and committed
- [ ] Unit tests written and passing (if applicable)
- [ ] Integration tests written and passing
- [ ] PR opened with description
- [ ] Fredo pre-push scan: CLEAR
- [ ] Deployed to staging
- [ ] Seun reviewed on staging
- [ ] Seun approved → merge to main

### 9.6 Definition of done — project level

A project is done when:

- [ ] All P0 user stories complete and tested
- [ ] All CI gates passing on main
- [ ] Fredo final production scan: CLEAR
- [ ] Performance targets met (Lighthouse ≥ 80/90)
- [ ] Seun approved production deployment
- [ ] Production deployment successful
- [ ] Smoke tests on production pass (sign in, generate proof, verify link)
- [ ] README delivered with setup instructions and env var documentation
- [ ] Session sync complete
- [ ] Learnings logged to .learnings/

-----

## SECTION 10 — SECURITY AND COMPLIANCE

### 10.1 Authentication and authorisation

- Auth provider: NextAuth.js with Google provider
- Session management: JWT in httpOnly cookie. 30-day session expiry. Automatic token refresh via NextAuth.
- Role definitions:
  - `authenticated_worker`: can read and write their own proofs. Cannot access other users’ data. Enforced by RLS + server-side session check.
  - `public_verifier`: can read a specific proof only if they have the UUID. No account. No write access. Enforced by API route returning only active proof by ID.
  - `admin (Seun)`: full Supabase dashboard access. No separate admin panel in V1.
- Protected routes: `/dashboard`, `/dashboard/*`, `/api/documents`, `/api/proofs`
- Public routes: `/`, `/verify/[id]`, `/api/verify/[id]`, `/api/auth/*`

### 10.2 Data protection

- Encryption at rest: YES (Supabase default — AES-256)
- Encryption in transit: HTTPS enforced (Vercel forces HTTPS on all deployments)
- PII fields:
  - `users.email` — email address
  - `users.google_id` — Google identifier
  - `users.name` — full name
  - `proofs.primary_editor` — editor’s email address
  - `proofs.document_name` — may contain PII
- Data retention: Proofs retained indefinitely unless user deletes their account. Account deletion cascades to all proofs and proof_events.
- Right to deletion: User can delete their Oryx account from the dashboard. All data is deleted. This satisfies GDPR right to erasure. Implemented via Supabase cascade delete.

### 10.3 Compliance requirements

- [x] GDPR (EU users are likely from day one)
  - Cookie consent: NextAuth session cookie is essential (no analytics cookies in V1 — Sentry only on error). No consent banner needed for essential cookies.
  - Privacy policy: Required before launch. Must describe: data collected, purpose, retention, right to deletion, data processor (Supabase, Google, Vercel).
  - Data subject rights: Right to erasure implemented via account deletion. Right of access: user can export their proofs (V2 — not in V1 scope).
- [x] NDPR (Nigerian Data Protection Regulation — Seun is Nigerian operator)
  - Consent mechanism: Agreeing to terms of service on sign-up constitutes consent.
  - Privacy policy: Required (same as GDPR policy covers NDPR requirements).
  - Data processor agreement: Supabase and Vercel have DPAs available. Seun must execute these before handling EU/Nigerian user data in production.

### 10.4 Fredo security gates

- Pre-push: trufflehog secret scan (no secrets in commits)
- Pre-push: npm audit (no critical findings)
- Post-staging: observatory-cli security headers check
- Post-staging: HTTPS enforcement check
- Pre-production: full Fredo security audit

-----

## SECTION 11 — DEPLOYMENT AND OPERATIONS

### 11.1 Environments

|Environment|URL                    |Purpose                |Who deploys                     |
|-----------|-----------------------|-----------------------|--------------------------------|
|Local      |localhost:3000         |Development and testing|Clemenza                        |
|Staging    |staging.projectoryx.com|Review and QA          |Clemenza (auto on merge to main)|
|Production |projectoryx.com        |Live system            |Clemenza (Seun approved only)   |

### 11.2 CI/CD pipeline (GitHub Actions)

**On every push to any branch:**

- Run Vitest unit tests
- Run Vitest coverage check (fail if Proof Engine < 80%)
- Fredo secret scan (trufflehog)

**On PR to main:**

- All above
- Run integration tests
- Run E2E tests against staging preview deployment
- Fredo full security scan (npm audit, observatory-cli)
- Lighthouse CI (Performance ≥ 80, Accessibility ≥ 90)

**On merge to main:**

- Auto-deploy to staging
- Run smoke tests: landing page loads, OAuth flow resolves, verify page loads for test proof
- Notify Seun via Telegram: “Staging deployment complete — [commit message]. Ready for review.”

**On Seun approval:**

- Deploy to production
- Run production smoke tests
- Notify Seun via Telegram: “Production deployment complete — Oryx is live.”

### 11.3 Environment variables

|Variable                     |Purpose                                                               |Where stored           |Required in         |
|-----------------------------|----------------------------------------------------------------------|-----------------------|--------------------|
|NEXTAUTH_URL                 |App base URL for NextAuth callbacks                                   |Vercel env + .env.local|staging + production|
|NEXTAUTH_SECRET              |JWT signing secret (generate with `openssl rand -base64 32`)          |Vercel env + .env.local|staging + production|
|GOOGLE_CLIENT_ID             |OAuth 2.0 client ID from Google Cloud Console                         |Vercel env + .env.local|staging + production|
|GOOGLE_CLIENT_SECRET         |OAuth 2.0 client secret                                               |Vercel env + .env.local|staging + production|
|NEXT_PUBLIC_SUPABASE_URL     |Supabase project URL                                                  |Vercel env + .env.local|staging + production|
|NEXT_PUBLIC_SUPABASE_ANON_KEY|Supabase anon key (public — safe in browser)                          |Vercel env + .env.local|staging + production|
|SUPABASE_SERVICE_ROLE_KEY    |Supabase service role key (server-side only — never expose to browser)|Vercel env + .env.local|staging + production|
|SENTRY_DSN                   |Sentry error tracking endpoint                                        |Vercel env + .env.local|staging + production|

### 11.4 Monitoring and alerts

- Error tracking: Sentry (free tier — 5,000 errors/month)
- Uptime monitoring: Vercel Analytics (built-in) + Vercel status notifications
- Alert channel: Telegram via Consigliere

### 11.5 Rollback plan

- Vercel: `vercel rollback` to previous deployment (instant)
- Database: No destructive migrations in V1 (additive schema only). Rollback is safe.
- Trigger: Seun decision or Fredo CRITICAL finding post-production
- Emergency: Revert commit, re-deploy via Vercel CLI. No new code during emergency.

-----

## SECTION 12 — TASK BREAKDOWN

### Task list

-----

```
ID:             T-001
Title:          Google Cloud Project setup and OAuth configuration
Assigned to:    Seun (manual — agents cannot create Google Cloud accounts)
Model:          n/a
Dependencies:   none
Status:         READY

Goal:           Google Cloud Project exists with Drive API, Drive Activity API
                enabled, and OAuth 2.0 credentials created.

Context:        Go to console.cloud.google.com. Create a new project named "Oryx".
                Enable: Google Drive API v3, Google Drive Activity API v2.
                Create OAuth 2.0 credentials (Web application type).
                Authorized redirect URIs for staging:
                  http://localhost:3000/api/auth/callback/google
                  https://staging.projectoryx.com/api/auth/callback/google
                  https://projectoryx.com/api/auth/callback/google
                Submit OAuth consent screen for production verification immediately
                (takes 7-10 business days — this is the longest lead time item).
                Use "Testing" mode with Seun's email as test user in the interim.

Acceptance:     [ ] Google Cloud Project "Oryx" exists
                [ ] Drive API v3 is enabled
                [ ] Drive Activity API v2 is enabled
                [ ] OAuth 2.0 client credentials created (client ID + secret available)
                [ ] Localhost redirect URI added
                [ ] Staging redirect URI added
                [ ] OAuth consent screen submitted for verification
                [ ] GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET documented and ready
                    to be added to .env.local

Scope:          Google Cloud Console only. Do not touch codebase.
Output:         GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET values ready for T-002.
                Telegram message to The Don: "T-001 complete — credentials ready."
```

-----

```
ID:             T-002
Title:          Repository scaffold and environment setup
Assigned to:    Clemenza
Model:          cloud
Dependencies:   T-001 (needs credentials for .env.local)
Status:         READY

Goal:           Next.js 14 project exists with correct dependencies, folder
                structure, environment variables, Vercel deployment, and GitHub
                repository connected.

Context:        Project name: oryx-v1
                GitHub repo: create private repo under Seun's account named oryx-v1
                
                Bootstrap command:
                npx create-next-app@latest oryx-v1 \
                  --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
                
                Install dependencies:
                npm install next-auth @auth/core googleapis @supabase/supabase-js \
                  @sentry/nextjs uuid
                npm install -D vitest @vitejs/plugin-react playwright \
                  @playwright/test @testing-library/react @testing-library/jest-dom \
                  jsdom supertest

                Folder structure to create:
                /src
                  /app
                    /dashboard
                    /verify/[id]
                    /api
                      /auth/[...nextauth]
                      /documents
                      /proofs
                      /verify/[id]
                  /lib
                    google.ts        (Google API service — stub only)
                    proof-engine.ts  (Proof Engine — stub only)
                    supabase.ts      (Supabase client — stub only)
                  /components
                  /types
                    index.ts         (shared TypeScript types)
                /tests
                  /unit
                  /integration
                  /e2e

                .env.local (from T-001 values):
                NEXTAUTH_URL=http://localhost:3000
                NEXTAUTH_SECRET=[generate with: openssl rand -base64 32]
                GOOGLE_CLIENT_ID=[from T-001]
                GOOGLE_CLIENT_SECRET=[from T-001]
                NEXT_PUBLIC_SUPABASE_URL=[from T-003]
                NEXT_PUBLIC_SUPABASE_ANON_KEY=[from T-003]
                SUPABASE_SERVICE_ROLE_KEY=[from T-003]
                SENTRY_DSN=[from Sentry project]

                Create Vercel project connected to GitHub repo.
                Set all environment variables in Vercel dashboard for staging.

Acceptance:     [ ] `npm run dev` starts without errors on localhost:3000
                [ ] `npm run build` completes without errors
                [ ] All dependencies installed with no critical npm audit findings
                [ ] Folder structure matches specification above
                [ ] .env.local exists locally (never committed)
                [ ] .gitignore includes .env.local, .env*.local, node_modules
                [ ] Vercel project created and connected to GitHub repo
                [ ] First deployment to staging-oryx.vercel.app succeeds (default Next.js page)
                [ ] Staging URL accessible in browser

Scope:          Repository and project setup only. No feature code. Stubs only in /lib files.
Output:         GitHub repo URL. Staging URL. Commit: "chore: project scaffold".
                Telegram to The Don: "T-002 complete — scaffold live at [staging URL]."
```

-----

```
ID:             T-003
Title:          Supabase project setup and database schema
Assigned to:    Clemenza
Model:          cloud
Dependencies:   T-002
Status:         READY

Goal:           Supabase project exists with correct schema, indexes, RLS policies,
                and connection credentials available for the application.

Context:        Go to supabase.com. Create new project named "oryx-v1".
                Select region closest to target users (EU West or US East).
                
                Create schema via Supabase SQL editor. Run the following migrations:

                Migration 001 — users table:
                CREATE TABLE users (
                  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                  google_id text UNIQUE NOT NULL,
                  email text UNIQUE NOT NULL,
                  name text NOT NULL,
                  avatar_url text,
                  created_at timestamptz DEFAULT now(),
                  updated_at timestamptz DEFAULT now()
                );

                Migration 002 — proofs table:
                CREATE TABLE proofs (
                  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                  document_id text NOT NULL,
                  document_name text NOT NULL,
                  document_url text NOT NULL,
                  generated_at timestamptz NOT NULL DEFAULT now(),
                  revision_count integer NOT NULL,
                  first_edit_at timestamptz NOT NULL,
                  last_edit_at timestamptz NOT NULL,
                  time_span_days integer NOT NULL,
                  active_days integer NOT NULL,
                  active_sessions integer NOT NULL,
                  unique_editors integer NOT NULL,
                  primary_editor text NOT NULL,
                  edit_pattern jsonb NOT NULL,
                  proof_hash text NOT NULL,
                  is_active boolean NOT NULL DEFAULT true,
                  expires_at timestamptz,
                  view_count integer NOT NULL DEFAULT 0
                );

                Migration 003 — proof_events table:
                CREATE TABLE proof_events (
                  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                  proof_id uuid NOT NULL REFERENCES proofs(id) ON DELETE CASCADE,
                  event_type text NOT NULL CHECK (event_type IN ('generated','viewed','shared','deactivated')),
                  ip_hash text,
                  user_agent text,
                  created_at timestamptz NOT NULL DEFAULT now()
                );

                Migration 004 — indexes:
                CREATE INDEX idx_proofs_user_id ON proofs(user_id);
                CREATE INDEX idx_proofs_document_id ON proofs(document_id);
                CREATE INDEX idx_proof_events_proof_id ON proof_events(proof_id);
                CREATE INDEX idx_proof_events_created_at ON proof_events(created_at);

                Migration 005 — RLS:
                ALTER TABLE users ENABLE ROW LEVEL SECURITY;
                ALTER TABLE proofs ENABLE ROW LEVEL SECURITY;
                ALTER TABLE proof_events ENABLE ROW LEVEL SECURITY;
                
                -- Service role bypasses RLS (used in API routes server-side)
                -- No client-facing RLS policies needed in V1 because all DB access
                -- goes through server-side API routes using the service role key.

                Save all migration SQL files to /supabase/migrations/ in the repo.

                Update .env.local and Vercel environment variables with:
                NEXT_PUBLIC_SUPABASE_URL=[project URL]
                NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon key]
                SUPABASE_SERVICE_ROLE_KEY=[service role key — server-side only]

                Create /src/lib/supabase.ts:
                - createServerClient() function using service role key (for API routes)
                - createBrowserClient() function using anon key (for client components if needed)
                Use @supabase/supabase-js v2.

Acceptance:     [ ] Supabase project created and accessible
                [ ] All three tables created with correct columns and constraints
                [ ] All indexes created
                [ ] RLS enabled on all tables
                [ ] Migration SQL files saved in /supabase/migrations/
                [ ] /src/lib/supabase.ts exports createServerClient and createBrowserClient
                [ ] Environment variables updated in .env.local and Vercel
                [ ] `npm run build` still passes after supabase.ts added

Scope:          Supabase project and /src/lib/supabase.ts only.
Output:         Commit: "feat: supabase schema and client".
                Telegram to The Don: "T-003 complete — database schema live."
```

-----

```
ID:             T-004
Title:          Google OAuth authentication with NextAuth
Assigned to:    Clemenza
Model:          cloud
Dependencies:   T-002, T-003
Status:         READY

Goal:           User can sign in with Google and be redirected to /dashboard.
                Session persists. User record is created in Supabase on first sign-in.
                Protected routes redirect unauthenticated users to /.

Context:        File paths to create or modify:
                /src/app/api/auth/[...nextauth]/route.ts
                /src/lib/auth.ts (NextAuth config)
                /src/middleware.ts (route protection)

                NextAuth config (/src/lib/auth.ts):
                - Provider: Google
                - Scopes required:
                    openid
                    email
                    profile
                    https://www.googleapis.com/auth/drive.readonly
                    https://www.googleapis.com/auth/drive.activity.readonly
                - Callbacks:
                    jwt: store access_token and refresh_token in JWT
                    session: expose access_token in session (needed for Google API calls)
                    signIn: on first sign-in, upsert user record in Supabase using google_id
                - Session strategy: jwt
                - Pages: signIn: '/' (landing page handles sign-in CTA)

                Middleware (/src/middleware.ts):
                - Protect routes: /dashboard (and all sub-routes)
                - Protect API routes: /api/documents, /api/proofs
                - Public routes: /, /verify/:path*, /api/auth/:path*, /api/verify/:path*
                - Unauthenticated users hitting protected routes: redirect to /

                User upsert in Supabase (inside signIn callback):
                INSERT INTO users (google_id, email, name, avatar_url)
                VALUES ($1, $2, $3, $4)
                ON CONFLICT (google_id) DO UPDATE
                SET name = EXCLUDED.name, avatar_url = EXCLUDED.avatar_url,
                    updated_at = now();

                IMPORTANT: The access_token from Google must be available in the
                session object so that Google API calls in /api/documents and
                /api/proofs can use it. Test this explicitly.

Acceptance:     [ ] Visiting / shows landing page (no redirect)
                [ ] Clicking "Sign in with Google" initiates Google OAuth flow
                [ ] After granting consent, user is redirected to /dashboard
                [ ] User record exists in Supabase users table after first sign-in
                [ ] Session persists after page refresh on /dashboard
                [ ] session.accessToken is populated and accessible in API routes
                [ ] Visiting /dashboard without a session redirects to /
                [ ] Visiting /api/documents without a session returns 401
                [ ] Sign-out clears session and redirects to /
                [ ] `npm run build` passes

Scope:          /src/app/api/auth/, /src/lib/auth.ts, /src/middleware.ts only.
                Do not build the dashboard UI — just the auth layer.
Output:         Commit: "feat: google oauth and route protection".
                Telegram to The Don: "T-004 complete — auth working. Sign in → dashboard redirect confirmed."
```

-----

```
ID:             T-005
Title:          Google API service — document listing and revision extraction
Assigned to:    Clemenza
Model:          cloud
Dependencies:   T-004
Status:         READY

Goal:           /src/lib/google.ts exports two functions: listDocuments() and
                getDocumentRevisionData(). Both are tested and handle errors cleanly.

Context:        File to create: /src/lib/google.ts

                Function 1: listDocuments(accessToken: string)
                - Uses googleapis: drive_v3.Drive
                - Calls drive.files.list with:
                    q: "mimeType='application/vnd.google-apps.document' OR
                        mimeType='application/vnd.google-apps.spreadsheet' OR
                        mimeType='application/vnd.google-apps.presentation'
                        and trashed = false"
                    fields: "files(id,name,mimeType,modifiedTime,webViewLink)"
                    orderBy: "modifiedTime desc"
                    pageSize: 50
                - Returns: NormalisedDocument[]
                  type NormalisedDocument = {
                    id: string
                    name: string
                    mimeType: string
                    modifiedTime: string
                    webViewLink: string
                  }
                - Error handling: throws GoogleAPIError with message and status code

                Function 2: getDocumentRevisionData(accessToken: string, fileId: string)
                - Part A: Drive Revisions API
                  Calls drive.revisions.list with:
                    fileId: fileId
                    fields: "revisions(id,modifiedTime,lastModifyingUser/emailAddress)"
                    pageSize: 1000
                  Paginates if nextPageToken is present (repeat until exhausted).
                  Returns all revisions sorted by modifiedTime ascending.

                - Part B: Drive Activity API
                  Uses driveactivity_v2.Driveactivity
                  Calls driveActivity.activity.query with:
                    itemName: "items/" + fileId
                  Returns all activity events (edit, create, etc.)

                - Returns: RawRevisionData
                  type RawRevisionData = {
                    revisions: Array<{
                      id: string
                      modifiedTime: string
                      editorEmail: string | null
                    }>
                    activityEvents: Array<{
                      timestamp: string
                      editorEmail: string | null
                      actionType: string
                    }>
                  }

                - If revision list has fewer than 3 items, throw InsufficientHistoryError.
                - Error handling: distinguish between quota errors, auth errors, and
                  not-found errors.

                OAuth client initialisation:
                const auth = new google.auth.OAuth2()
                auth.setCredentials({ access_token: accessToken })
                const drive = google.drive({ version: 'v3', auth })
                const driveActivity = google.driveactivity({ version: 'v2', auth })

Acceptance:     [ ] listDocuments() returns array of NormalisedDocument for test account
                [ ] listDocuments() returns empty array (not error) if account has no matching docs
                [ ] getDocumentRevisionData() returns RawRevisionData for a document with > 3 revisions
                [ ] getDocumentRevisionData() throws InsufficientHistoryError for document with < 3 revisions
                [ ] Pagination works — function retrieves all revisions, not just first page
                [ ] Auth errors (expired token) throw descriptive error with status 401
                [ ] All Google API errors are caught and not allowed to propagate as unhandled rejections
                [ ] Unit tests for both functions using mocked googleapis client pass

Scope:          /src/lib/google.ts and /tests/unit/google.test.ts only.
Output:         Commit: "feat: google api service — document listing and revision extraction".
                Telegram to The Don: "T-005 complete — google API service ready."
```

-----

```
ID:             T-006
Title:          Proof Engine — calculation logic
Assigned to:    Clemenza
Model:          cloud
Dependencies:   T-005
Status:         READY

Goal:           /src/lib/proof-engine.ts exports calculateProof() which takes
                RawRevisionData and returns ProofData. 80% unit test coverage achieved.

Context:        File to create: /src/lib/proof-engine.ts

                Input type: RawRevisionData (from T-005)
                Output type: ProofData
                type ProofData = {
                  revisionCount: number
                  firstEditAt: string       // ISO 8601
                  lastEditAt: string        // ISO 8601
                  timeSpanDays: number      // days between first and last edit
                  activeDays: number        // distinct calendar days with edit activity
                  activeSessions: number    // distinct sessions (gap > 30 min = new session)
                  uniqueEditors: number
                  primaryEditor: string     // editor with most revision events
                  editPattern: EditSession[] // array of sessions for visualisation
                  proofHash: string         // SHA-256 of deterministic JSON
                }
                type EditSession = {
                  startTime: string   // ISO 8601
                  endTime: string     // ISO 8601
                  revisionCount: number
                  editorEmail: string | null
                }

                Calculation rules:
                - revisionCount: length of revisions array
                - firstEditAt: earliest modifiedTime in revisions array
                - lastEditAt: latest modifiedTime in revisions array
                - timeSpanDays: Math.ceil((lastEditAt - firstEditAt) / 86400000)
                - activeDays: count of distinct calendar dates (YYYY-MM-DD) in revision timestamps
                - activeSessions: group revisions into sessions where gap between consecutive
                  revisions > 30 minutes = new session boundary. Count sessions.
                - uniqueEditors: count of distinct non-null editorEmail values
                - primaryEditor: editorEmail with highest frequency in revisions array.
                  If tie, use earliest contributor.
                - editPattern: array of EditSession objects from session grouping above
                - proofHash: SHA-256 of JSON.stringify({
                    revisionCount, firstEditAt, lastEditAt, timeSpanDays,
                    activeDays, activeSessions, uniqueEditors, primaryEditor
                  }) — key order must be deterministic (alphabetical)
                  Use Node.js built-in: crypto.createHash('sha256').update(str).digest('hex')

                Edge cases to handle:
                - All revisions have null editorEmail → primaryEditor = 'unknown'
                - Single revision (should be caught by InsufficientHistoryError in T-005,
                  but handle defensively)
                - Revisions not in chronological order → sort by modifiedTime before processing

                This module must have zero external dependencies beyond Node.js built-ins.
                It is pure functions — no I/O, no API calls, fully deterministic.

Acceptance:     [ ] calculateProof() returns correct ProofData for a sample dataset of 20 revisions
                    across 5 days with 2 editors (values manually verified)
                [ ] Session detection correctly identifies gaps > 30 min as session boundaries
                [ ] activeDays count is correct for revisions spanning multiple days
                [ ] primaryEditor is the email with the most revision events
                [ ] proofHash is a valid SHA-256 hex string
                [ ] proofHash is identical for identical input (deterministic)
                [ ] proofHash changes if any input value changes
                [ ] Vitest coverage report shows ≥ 80% for proof-engine.ts
                [ ] No external dependencies in proof-engine.ts

Scope:          /src/lib/proof-engine.ts and /tests/unit/proof-engine.test.ts only.
Output:         Commit: "feat: proof engine with 80% test coverage".
                Telegram to The Don: "T-006 complete — proof engine passing. Coverage: [N]%."
```

-----

```
ID:             T-007
Title:          API routes — documents, proofs, and verify
Assigned to:    Clemenza
Model:          cloud
Dependencies:   T-004, T-005, T-006
Status:         READY

Goal:           All three API routes are implemented, returning correct responses,
                writing to Supabase, and covered by integration tests.

Context:        Files to create:
                /src/app/api/documents/route.ts
                /src/app/api/proofs/route.ts
                /src/app/api/verify/[id]/route.ts

                /api/documents (GET):
                - Get session from NextAuth → extract accessToken
                - Call listDocuments(accessToken) from google.ts
                - Return JSON response with documents array
                - On GoogleAPIError: return 502 with error message
                - On no session: NextAuth middleware handles this (401)

                /api/proofs (POST):
                - Get session → validate user is authenticated
                - Parse body: { documentId, documentName, documentUrl }
                - Call getDocumentRevisionData(accessToken, documentId) from google.ts
                - On InsufficientHistoryError: return 422 with
                  { error: 'INSUFFICIENT_HISTORY', message: '...' }
                - Call calculateProof(rawData) from proof-engine.ts
                - Write proof record to Supabase proofs table
                - Write ProofEvent 'generated' to proof_events table
                - Return 201 with { proofId, verificationUrl, proof }
                - verificationUrl = `${process.env.NEXTAUTH_URL}/verify/${proofId}`
                  Production example: https://projectoryx.com/verify/[uuid]

                /api/proofs (GET):
                - Get session → get user_id from session
                - Query Supabase: SELECT * FROM proofs WHERE user_id = $1
                  ORDER BY generated_at DESC
                - Return proofs array

                /api/verify/[id] (GET):
                - No auth required
                - Get id from params
                - Query Supabase: SELECT * FROM proofs WHERE id = $1 AND is_active = true
                - If not found: return 404
                - Increment view_count: UPDATE proofs SET view_count = view_count + 1 WHERE id = $1
                - Write ProofEvent 'viewed' with hashed IP to proof_events:
                  const ipHash = crypto.createHash('sha256')
                    .update(request.headers.get('x-forwarded-for') || 'unknown')
                    .digest('hex')
                - Return 200 with proof data (exclude proof_hash from public response)

                Rate limiting (middleware or in route):
                - /api/documents, /api/proofs: max 60 req/min per authenticated user
                - /api/verify/[id]: max 30 req/min per IP

                Integration tests use:
                - Mocked NextAuth session (vi.mock('next-auth'))
                - Mocked google.ts functions (vi.mock('@/lib/google'))
                - Mocked Supabase client (vi.mock('@/lib/supabase'))
                - Supertest for HTTP-level testing

Acceptance:     [ ] GET /api/documents returns 200 with documents array for authenticated user
                [ ] GET /api/documents returns 401 for unauthenticated request
                [ ] POST /api/proofs returns 201 with proofId and verificationUrl on success
                [ ] POST /api/proofs returns 422 with INSUFFICIENT_HISTORY for doc with < 3 revisions
                [ ] POST /api/proofs writes proof record to Supabase (verified via mock call assertion)
                [ ] POST /api/proofs writes ProofEvent 'generated' to Supabase
                [ ] GET /api/proofs returns array of user's proofs
                [ ] GET /api/verify/[id] returns 200 with proof data for valid UUID
                [ ] GET /api/verify/[id] returns 404 for unknown UUID
                [ ] GET /api/verify/[id] writes ProofEvent 'viewed' with hashed IP
                [ ] GET /api/verify/[id] increments view_count
                [ ] All integration tests pass via `npm test`

Scope:          The three API route files and /tests/integration/*.test.ts only.
Output:         Commit: "feat: api routes — documents, proofs, verify".
                Telegram to The Don: "T-007 complete — all API routes passing integration tests."
```

-----

```
ID:             T-008
Title:          Landing page
Assigned to:    Clemenza
Model:          cloud
Dependencies:   T-004
Status:         READY

Goal:           Landing page at / explains Oryx clearly, converts visitors to sign-in,
                and passes Lighthouse Performance ≥ 80, Accessibility ≥ 90.

Context:        File to create/modify: /src/app/page.tsx

                Content requirements (from PRD Story 6):
                - Hero: What Oryx is in plain language. One headline, one subheadline.
                - Problem: The problem being solved (AI content, no process proof).
                - How it works: 3 steps.
                  Step 1: Connect your Google account
                  Step 2: Select the document you want to verify
                  Step 3: Generate a Work Proof — a shareable, verifiable link
                - Why trust it: Data comes from Google's servers directly.
                  "Oryx retrieves your document's revision history directly from Google —
                  you cannot edit or fabricate it."
                - CTA: "Sign in with Google" button — triggers NextAuth signIn('google')
                - Footer: Privacy Policy link → /privacy (placeholder page at launch), "Powered by Oryx"
                - Domain: projectoryx.com

                Design direction:
                - Clean, minimal, professional — this is a trust product
                - Black/white/grey palette with a single accent colour
                - No blockchain, Web3, crypto, or token language anywhere
                - Mobile-first (375px minimum viewport)
                - No hero image or illustration in V1 — typography-led

                DO NOT:
                - Mention blockchain, crypto, tokens, Web3
                - Include a pricing section
                - Include testimonials (no users yet)
                - Use stock photos or clip art

Acceptance:     [ ] Landing page loads at / without authentication
                [ ] Page renders correctly on 375px (mobile) and 1280px (desktop)
                [ ] "Sign in with Google" button initiates OAuth flow
                [ ] All three sections present: hero, how it works, why trust it
                [ ] Privacy Policy link in footer navigates to /privacy (can be placeholder page)
                [ ] Lighthouse Performance ≥ 80 on mobile simulation
                [ ] Lighthouse Accessibility ≥ 90
                [ ] No mention of blockchain, crypto, or Web3 anywhere on the page
                [ ] `npm run build` passes

Scope:          /src/app/page.tsx and any components it needs. 
                Do not modify auth routes or API routes.
Output:         Commit: "feat: landing page".
                Telegram to The Don: "T-008 complete — landing page live on staging. Lighthouse: [scores]."
```

-----

```
ID:             T-009
Title:          Dashboard — document selector
Assigned to:    Clemenza
Model:          cloud
Dependencies:   T-007, T-008
Status:         READY

Goal:           Authenticated user can see their Google Drive documents,
                select one, and click "Generate Proof".

Context:        Files to create:
                /src/app/dashboard/page.tsx
                /src/components/DocumentSelector.tsx

                Behaviour:
                - On load: fetch GET /api/documents → display list
                - Each document shows: name, last modified date, document type
                - Click a document to select it (visual highlight)
                - "Generate Proof" button is disabled until a document is selected
                - Clicking "Generate Proof" with a document selected:
                  → Shows loading state
                  → POSTs to /api/proofs with selected document data
                  → On 201: renders the Work Proof UI (can be on same page or navigate)
                  → On 422 (INSUFFICIENT_HISTORY): shows user-friendly message explaining
                    the document needs more revision history
                  → On other error: shows generic error with retry option
                - Loading state while documents are fetching: skeleton list
                - Empty state if no documents: "No documents found in your Google Drive"
                - User's name visible in header (from session)
                - Sign out button in header

Acceptance:     [ ] /dashboard requires authentication (T-004 handles this)
                [ ] Document list loads within 5 seconds of page open
                [ ] Skeleton loading state visible while documents fetch
                [ ] Each document shows name and last modified date
                [ ] Clicking a document selects it (visual highlight)
                [ ] "Generate Proof" button is disabled until document selected
                [ ] Clicking "Generate Proof" shows loading state
                [ ] On success: Work Proof data is displayed (stub UI acceptable in this task)
                [ ] On 422: user-friendly message shown (not a raw error)
                [ ] On network error: retry option shown
                [ ] Sign out button works and redirects to /
                [ ] Page renders correctly on mobile (375px)

Scope:          /src/app/dashboard/page.tsx and /src/components/DocumentSelector.tsx.
                Work Proof display UI is a stub in this task — full display in T-010.
Output:         Commit: "feat: dashboard document selector".
                Telegram to The Don: "T-009 complete — document selector working on staging."
```

-----

```
ID:             T-010
Title:          Work Proof display and share link UI
Assigned to:    Clemenza
Model:          cloud
Dependencies:   T-009
Status:         READY

Goal:           Generated Work Proof is displayed clearly to the worker with all
                required data points and a working copy-link button.

Context:        Files to create/modify:
                /src/components/WorkProof.tsx
                /src/app/dashboard/page.tsx (update to use WorkProof component)

                WorkProof component receives ProofData as props and renders:

                Required data points (see Story 3 acceptance criteria):
                - Document name (prominent)
                - Revision count: "47 revisions"
                - Time span: "Created over 19 days" (use timeSpanDays)
                - Active working days: "Active on 8 days"
                - Working sessions: "12 working sessions detected"
                - First edit: formatted date (e.g. "May 1, 2026")
                - Last edit: formatted date
                - Primary editor: email address (from Google, not self-reported)
                - Additional editors: "1 additional editor" or "No additional editors"
                - Edit frequency visualisation: visual timeline showing when sessions occurred
                  (simple bar chart or dot plot — use only Tailwind CSS, no chart library)
                - Oryx verification statement:
                  "This data was retrieved directly from Google's servers by Oryx on
                  [generated_at date/time]. It cannot be altered by the document owner."

                Share section:
                - Display the full verification URL
                - "Copy link" button: uses navigator.clipboard.writeText(url)
                - "Copied!" confirmation text appears for 2 seconds after click
                - URL format: [NEXTAUTH_URL]/verify/[proofId]

                Design: clean, trustworthy, credential-like. Not a dashboard widget.
                This is a document that someone might print or screenshot.
                Use generous whitespace, clear hierarchy, restrained typography.

Acceptance:     [ ] All data points from Story 3 acceptance criteria are visible
                [ ] Oryx verification statement present with generated_at timestamp
                [ ] Edit frequency visualisation renders (even if simple)
                [ ] "Copy link" button copies correct URL to clipboard
                [ ] "Copied!" confirmation appears and disappears after 2 seconds
                [ ] WorkProof renders correctly on mobile (375px)
                [ ] No chart libraries used — Tailwind CSS only for visualisation

Scope:          /src/components/WorkProof.tsx only. 
                Update dashboard to use it. Do not modify API routes.
Output:         Commit: "feat: work proof display and share link".
                Telegram to The Don: "T-010 complete — work proof display on staging. Screenshot sent."
```

-----

```
ID:             T-011
Title:          Public verification page
Assigned to:    Clemenza
Model:          cloud
Dependencies:   T-007, T-010
Status:         READY

Goal:           /verify/[id] renders the full Work Proof to an unauthenticated
                verifier. Page loads within 3 seconds on 3G. No login prompt shown.

Context:        File to create: /src/app/verify/[id]/page.tsx

                This is a Next.js server component. No client-side data fetching.
                
                Behaviour:
                - Server fetches proof from Supabase by ID (using service role key)
                - If not found or is_active = false: render a clean 404/inactive page
                - If found: render the WorkProof component with proof data
                - Log ProofEvent 'viewed' server-side (IP hash from x-forwarded-for header)
                - No authentication required — this route must be accessible without cookies
                - No "Sign in to Oryx" prompt anywhere on this page
                - Add noindex meta tag (verifiers don't need to find this via search)

                Additional elements on the verification page (not on worker's view):
                - Header: "Oryx Work Proof" — small, unobtrusive
                - Footer: "Verified by Oryx — data sourced directly from Google Drive"
                - Small "What is Oryx?" link → opens projectoryx.com in new tab

                The page should feel like an official certificate or credential,
                not like a web app. Minimal chrome. The proof is the focus.

                404/inactive page content:
                - "This proof is no longer available."
                - "The link may have expired or been deactivated by the document owner."
                - Link to projectoryx.com (landing page)

Acceptance:     [ ] /verify/[valid-uuid] renders full Work Proof without authentication
                [ ] /verify/[invalid-uuid] renders clean 404 message
                [ ] /verify/[deactivated-proof-uuid] renders "no longer available" message
                [ ] No "Sign in" or "Create account" prompts visible on the page
                [ ] "What is Oryx?" link navigates to landing page in new tab
                [ ] ProofEvent 'viewed' is written to Supabase when page loads
                [ ] view_count is incremented in proofs table
                [ ] Lighthouse Performance ≥ 80 on 3G simulation
                [ ] Lighthouse Accessibility ≥ 90
                [ ] noindex meta tag present

Scope:          /src/app/verify/[id]/page.tsx only.
Output:         Commit: "feat: public verification page".
                Telegram to The Don: "T-011 complete — verification page live. 
                Opened without auth: confirmed. Lighthouse: [scores]."
```

-----

```
ID:             T-012
Title:          Fredo security configuration and CI/CD pipeline
Assigned to:    Fredo
Model:          cloud
Dependencies:   T-002
Status:         READY

Goal:           GitHub Actions CI pipeline is live and all Fredo security gates
                are configured and passing.

Context:        Files to create:
                /.github/workflows/ci.yml
                /.github/workflows/deploy.yml

                CI workflow (ci.yml) — runs on every push and PR:
                Steps:
                1. Checkout code
                2. Setup Node.js 20
                3. Install dependencies: npm ci
                4. Fredo secret scan: npx trufflehog filesystem . --only-verified
                5. npm audit: npm audit --audit-level=critical (fail on critical)
                6. Run unit tests: npx vitest run
                7. Run coverage check: npx vitest run --coverage
                   (fail if proof-engine.ts < 80%)
                8. Build: npm run build

                Deploy workflow (deploy.yml) — runs on merge to main:
                Steps:
                1. CI steps above
                2. Run integration tests: npx vitest run tests/integration
                3. Deploy to Vercel staging: npx vercel --token $VERCEL_TOKEN
                4. Run E2E smoke tests against staging: npx playwright test
                5. Fredo post-staging: npx observatory-cli [staging-url] --format json
                   (fail if grade < B)
                6. Notify Seun via Telegram (use Telegram Bot API):
                   "Staging deployment complete — [commit message]. Review at [staging URL]."

                Telegram notification step:
                TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID stored as GitHub Secrets.
                Use curl to POST to Telegram Bot API sendMessage endpoint.

                GitHub Secrets to configure:
                VERCEL_TOKEN, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID,
                NEXTAUTH_URL (staging), NEXTAUTH_SECRET, GOOGLE_CLIENT_ID,
                GOOGLE_CLIENT_SECRET, NEXT_PUBLIC_SUPABASE_URL,
                NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY

Acceptance:     [ ] CI workflow runs on push to any branch
                [ ] CI fails if trufflehog finds verified secrets in code
                [ ] CI fails if npm audit finds critical vulnerabilities
                [ ] CI fails if unit tests fail
                [ ] CI fails if proof-engine.ts coverage < 80%
                [ ] CI fails if npm run build fails
                [ ] Deploy workflow runs on merge to main
                [ ] Deploy workflow deploys to Vercel staging automatically
                [ ] Telegram message sent to Seun after successful staging deploy
                [ ] Observatory-cli grade ≥ B on staging (or CI fails)
                [ ] All secrets are in GitHub Secrets — none hardcoded in workflow files

Scope:          /.github/workflows/ only.
Output:         Commit: "ci: github actions pipeline and fredo security gates".
                Telegram to The Don: "T-012 complete — CI pipeline live. 
                First automated deploy to staging triggered."
```

-----

```
ID:             T-013
Title:          E2E tests — all P0 user stories
Assigned to:    Clemenza
Model:          cloud
Dependencies:   T-008, T-009, T-010, T-011
Status:         READY

Goal:           Playwright E2E tests cover all P0 user stories and pass against staging.

Context:        File to create: /tests/e2e/

                Stories to cover:
                - Story 1: Sign in with Google → redirected to dashboard
                  (use Playwright's Google OAuth mock or test account credentials
                  stored as environment secrets — do NOT hardcode)
                - Story 2: Document selector loads and allows selection
                - Story 3: Generate proof → all data points visible on screen
                - Story 4: Copy link button → URL in clipboard
                - Story 5: Open verification URL in new context (no cookies) → proof renders
                - Story 6: Landing page loads → CTA button visible and clickable

                Google OAuth in E2E tests:
                Option A (preferred): Mock the NextAuth session using Playwright's
                storageState to inject a pre-authenticated session cookie.
                This avoids dependency on Google's OAuth in CI.
                Document the mock setup clearly in /tests/e2e/README.md.

                Option B (fallback): Use a dedicated Google test account with credentials
                in GitHub Secrets. Slower and brittle — use only if Option A not viable.

                Playwright config:
                - Browser: Chromium (headless in CI)
                - Base URL: staging URL
                - Timeout: 30 seconds per test
                - Screenshot on failure

Acceptance:     [ ] All 6 story E2E tests written
                [ ] All tests pass against staging environment
                [ ] Google OAuth handled via session mock (not live OAuth in CI)
                [ ] Tests run in headless Chromium
                [ ] Screenshots captured on failure
                [ ] `npx playwright test` command documented in README

Scope:          /tests/e2e/ only.
Output:         Commit: "test: e2e tests for all P0 user stories".
                Telegram to The Don: "T-013 complete — E2E tests passing. [N] tests, 0 failures."
```

-----

## SECTION 13 — RISKS

|ID  |Risk                                                                                                                                                                                                                                                       |Likelihood|Impact|Mitigation                                                                                                                                                                                                           |Owner   |
|----|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------|
|R-01|Google OAuth consent screen verification takes 7-10 business days. Without production verification, OAuth is limited to 100 test users and shows an “unverified app” warning to users.                                                                     |High      |High  |Submit consent screen on Day 1 (T-001). Use test mode with Seun’s email during development. Build and test the full product while awaiting approval.                                                                 |Seun    |
|R-02|Google Drive Revisions API returns sparse data for documents that were uploaded (e.g. Word files converted to Docs) rather than created natively in Google Docs. Revision history may only show content changes after upload, not the full writing process.|Medium    |Medium|Handle gracefully in the UI with a clear message: “Limited revision history available — this document may have been uploaded rather than created in Google Docs.” Add this as guidance on the landing page.          |Clemenza|
|R-03|Google Drive Activity API requires additional OAuth scope (drive.activity.readonly) which may cause higher OAuth consent drop-off if users are wary of granting it.                                                                                        |Medium    |Medium|Explain clearly in the OAuth consent screen description why Oryx needs this scope. Scope explanation: “To show when you worked on your document.”                                                                    |Seun    |
|R-04|No paying customer or LOI secured within 60 days of launch.                                                                                                                                                                                                |Medium    |High  |Soft launch immediately after staging approval — do not wait for perfect polish. Seun contacts prospects on Day 1 of staging readiness. The product is the conversation starter, not the outcome of the conversation.|Seun    |
|R-05|Supabase free tier storage or MAU limits hit before revenue. Supabase free tier: 500MB storage, 50,000 monthly active users, 2GB bandwidth.                                                                                                                |Low       |Low   |Monitor via Supabase dashboard. At V1 scale (< 100 users) this is not a concern. Supabase Pro ($25/month) is the upgrade path if needed. Budget allows this.                                                         |Seun    |
|R-06|Google API quota exhaustion. Drive API free quota: 1 billion requests/day. Activity API: 8 queries/second.                                                                                                                                                 |Low       |Medium|At V1 scale, quotas are irrelevant. Implement API response caching for proof generation (cache raw revision data for 1 hour by fileId) in V2 if scale demands it.                                                    |Clemenza|

### Risk escalation

- R-01 (High + High): Seun must begin consent screen submission before any other task. Non-negotiable.
- R-04 (Medium + High): Seun begins prospect outreach as soon as staging is stable (after T-011). No waiting for production.
- All other risks: documented, monitored, no immediate action needed.

-----

## SECTION 14 — APPROVAL GATES

|Gate                                                             |Approver|Status  |Date      |
|-----------------------------------------------------------------|--------|--------|----------|
|Open questions resolved                                          |Seun    |APPROVED|2026-05-22|
|Tech stack approved                                              |Seun    |APPROVED|2026-05-22|
|Architecture approved                                            |Seun    |APPROVED|2026-05-22|
|T-001 complete — Google Cloud Project and OAuth credentials ready|Seun    |PENDING |—         |
|T-003 complete — Supabase schema reviewed and confirmed          |Seun    |PENDING |—         |
|Foundation complete — T-002 through T-004 deployed to staging    |Seun    |PENDING |—         |
|Core features on staging — T-005 through T-011 deployed          |Seun    |PENDING |—         |
|E2E tests passing — T-013 complete                               |Seun    |PENDING |—         |
|Pre-production Fredo scan: CLEAR                                 |Fredo   |PENDING |—         |
|Production deployment approved                                   |Seun    |PENDING |—         |
|Project signed off                                               |Seun    |PENDING |—         |

-----

*PRD ready for review — Oryx V1 — projectoryx.com*
*0 open questions — all resolved.*
*6 P0 user stories.*
*13 tasks ready for execution pending stack and architecture approval.*
*Awaiting Seun’s approval of tech stack and architecture before build begins.*
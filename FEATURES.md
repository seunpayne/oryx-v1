# ORYX V1 — FEATURE DEVELOPMENT PLAN

**Project:** Oryx V1 (Document Work Proof Generator)  
**Staging:** https://oryx-v1.vercel.app  
**Phase:** Feature Development (GATE 5 → GATE 6)

---

## FEATURE LANE 1: AUTHENTICATION (T-010)

**Goal:** Google OAuth sign-in flow

**Tasks:**
- [ ] T-010.1: NextAuth.js configuration (`/src/pages/api/auth/[...nextauth].ts`)
- [ ] T-010.2: Sign-in page (`/src/app/signin/page.tsx`)
- [ ] T-010.3: Auth session provider (`/src/lib/auth.ts`)
- [ ] T-010.4: Protected route middleware
- [ ] T-010.5: User session type definitions

**Acceptance Criteria:**
- User can sign in with Google
- Session persists across page reloads
- Protected routes redirect to sign-in
- User profile stored in Supabase `users` table on first sign-in

**Dependencies:** None (foundation complete)

---

## FEATURE LANE 2: DASHBOARD (T-011)

**Goal:** List user's Google Drive documents

**Tasks:**
- [ ] T-011.1: Dashboard layout (`/src/app/dashboard/page.tsx`)
- [ ] T-011.2: Google Drive API integration (`/src/lib/drive.ts`)
- [ ] T-011.3: Document list component
- [ ] T-011.4: Loading states and error handling
- [ ] T-011.5: Document card UI (name, last modified, link)

**Acceptance Criteria:**
- Authenticated users see their Drive documents
- Documents sorted by last modified (newest first)
- Click to open document in Google Drive
- Graceful error if OAuth token expired

**Dependencies:** T-010 (auth) complete

---

## FEATURE LANE 3: PROOF GENERATION (T-012)

**Goal:** Generate work proof from document revision history

**Tasks:**
- [ ] T-012.1: Proof generation API route (`/src/app/api/proofs/route.ts`)
- [ ] T-012.2: Drive Activity API integration
- [ ] T-012.3: Proof calculation (uses existing `proof-engine.ts`)
- [ ] T-012.4: Save proof to Supabase
- [ ] T-012.5: Proof generation UI (button, progress, result)

**Acceptance Criteria:**
- User selects document from dashboard
- System fetches revision history + activity events
- Proof calculated (active days, sessions, editors, hash)
- Proof saved to `proofs` table
- User sees proof summary on screen

**Dependencies:** T-010 (auth) + T-011 (drive integration) complete

---

## FEATURE LANE 4: VERIFICATION PAGE (T-013)

**Goal:** Public page to view a proof

**Tasks:**
- [ ] T-013.1: Public verification page (`/src/app/verify/[id]/page.tsx`)
- [ ] T-013.2: Proof fetch API (`/src/app/api/proofs/[id]/route.ts`)
- [ ] T-013.3: Proof display component (read-only)
- [ ] T-013.4: Share link generation
- [ ] T-013.5: View tracking (proof_events table)

**Acceptance Criteria:**
- Anyone with proof ID can view proof
- Shows all proof metrics (no edit access)
- View event logged to `proof_events`
- Clean, professional UI for sharing

**Dependencies:** T-012 (proof generation) complete

---

## EXECUTION ORDER

**Sprint 1:** T-010 (Auth) + T-011 (Dashboard) — parallel lanes  
**Sprint 2:** T-012 (Proof Generation)  
**Sprint 3:** T-013 (Verification) + polish

**Estimated:** 3-4 sessions total

---

## GATE 6: PRE-PRODUCTION CHECKLIST

Before production deployment:

- [ ] All 4 feature lanes complete
- [ ] Fredo security scan (headers, secrets, HTTPS)
- [ ] E2E tests passing (Playwright)
- [ ] Custom domain configured (projectoryx.com)
- [ ] OAuth consent screen published (Google)
- [ ] Production environment variables set
- [ ] Seun approves GATE 6

---

**Next Action:** Begin T-010 (Authentication) — creating NextAuth.js config and sign-in page.

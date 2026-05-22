-- Migration 001: users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  google_id text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Migration 002: proofs table
CREATE TABLE IF NOT EXISTS proofs (
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

-- Migration 003: proof_events table
CREATE TABLE IF NOT EXISTS proof_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  proof_id uuid NOT NULL REFERENCES proofs(id) ON DELETE CASCADE,
  event_type text NOT NULL CHECK (event_type IN ('generated','viewed','shared','deactivated')),
  ip_hash text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Migration 004: indexes
CREATE INDEX IF NOT EXISTS idx_proofs_user_id ON proofs(user_id);
CREATE INDEX IF NOT EXISTS idx_proofs_document_id ON proofs(document_id);
CREATE INDEX IF NOT EXISTS idx_proof_events_proof_id ON proof_events(proof_id);
CREATE INDEX IF NOT EXISTS idx_proof_events_created_at ON proof_events(created_at);

-- Migration 005: RLS (no client policies in V1 — all access via server-side service role)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE proofs ENABLE ROW LEVEL SECURITY;
ALTER TABLE proof_events ENABLE ROW LEVEL SECURITY;

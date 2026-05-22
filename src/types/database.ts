/**
 * Database Schema Types
 * Generated from Supabase schema
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          google_id: string
          email: string
          name: string
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          google_id: string
          email: string
          name: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      proofs: {
        Row: {
          id: string
          user_id: string
          document_id: string
          document_name: string
          document_url: string
          generated_at: string
          revision_count: number
          first_edit_at: string
          last_edit_at: string
          time_span_days: number
          active_days: number
          active_sessions: number
          unique_editors: number
          primary_editor: string
          edit_pattern: Json
          proof_hash: string
          is_active: boolean
          expires_at: string | null
          view_count: number
        }
        Insert: {
          id?: string
          user_id: string
          document_id: string
          document_name: string
          document_url: string
          generated_at?: string
          revision_count: number
          first_edit_at: string
          last_edit_at: string
          time_span_days: number
          active_days: number
          active_sessions: number
          unique_editors: number
          primary_editor: string
          edit_pattern: Json
          proof_hash: string
          is_active?: boolean
          expires_at?: string | null
          view_count?: number
        }
      }
      proof_events: {
        Row: {
          id: string
          proof_id: string
          event_type: string
          ip_hash: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          proof_id: string
          event_type: string
          ip_hash?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
    }
  }
}

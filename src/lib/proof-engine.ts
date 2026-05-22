/**
 * Proof Engine
 * 
 * Owns: all calculation logic — revision stats, session detection,
 * active days count, edit frequency pattern, primary editor identification,
 * integrity hash generation
 * Does not own: Google API calls, storage, or any I/O
 * Technology: Pure TypeScript functions. Zero external dependencies.
 */

import { createHash } from 'crypto'

export type EditSession = {
  startTime: string
  endTime: string
  revisionCount: number
  editorEmail: string | null
}

export type ProofData = {
  revisionCount: number
  firstEditAt: string
  lastEditAt: string
  timeSpanDays: number
  activeDays: number
  activeSessions: number
  uniqueEditors: number
  primaryEditor: string
  editPattern: EditSession[]
  proofHash: string
}

type RawRevision = {
  modifiedTime: string
  editorEmail: string | null
}

/**
 * Calculate Work Proof from raw revision data
 */
export function calculateProof(revisions: RawRevision[]): ProofData {
  if (revisions.length === 0) {
    throw new Error('Cannot calculate proof with zero revisions')
  }

  // Sort by timestamp
  const sorted = [...revisions].sort(
    (a, b) => new Date(a.modifiedTime).getTime() - new Date(b.modifiedTime).getTime()
  )

  const revisionCount = sorted.length
  const firstEditAt = sorted[0].modifiedTime
  const lastEditAt = sorted[sorted.length - 1].modifiedTime

  // Time span in days
  const firstTime = new Date(firstEditAt).getTime()
  const lastTime = new Date(lastEditAt).getTime()
  const timeSpanDays = Math.ceil((lastTime - firstTime) / 86400000) || 1

  // Active days (distinct calendar dates)
  const activeDates = new Set(
    sorted.map(r => new Date(r.modifiedTime).toISOString().split('T')[0])
  )
  const activeDays = activeDates.size

  // Session detection (gap > 30 min = new session)
  const SESSION_GAP_MS = 30 * 60 * 1000
  const sessions: EditSession[] = []
  let currentSession: EditSession | null = null

  for (const rev of sorted) {
    const revTime = new Date(rev.modifiedTime).getTime()

    if (!currentSession) {
      currentSession = {
        startTime: rev.modifiedTime,
        endTime: rev.modifiedTime,
        revisionCount: 1,
        editorEmail: rev.editorEmail,
      }
    } else {
      const lastTime = new Date(currentSession.endTime).getTime()
      if (revTime - lastTime > SESSION_GAP_MS) {
        // New session
        sessions.push(currentSession)
        currentSession = {
          startTime: rev.modifiedTime,
          endTime: rev.modifiedTime,
          revisionCount: 1,
          editorEmail: rev.editorEmail,
        }
      } else {
        // Continue session
        currentSession.endTime = rev.modifiedTime
        currentSession.revisionCount++
      }
    }
  }

  if (currentSession) {
    sessions.push(currentSession)
  }

  const activeSessions = sessions.length

  // Unique editors
  const editorEmails = sorted
    .map(r => r.editorEmail)
    .filter((email): email is string => email !== null)
  const uniqueEditors = new Set(editorEmails).size

  // Primary editor (most frequent)
  const editorCounts = new Map<string, number>()
  for (const email of editorEmails) {
    editorCounts.set(email, (editorCounts.get(email) || 0) + 1)
  }

  let primaryEditor = 'unknown'
  let maxCount = 0
  for (const entry of Array.from(editorCounts.entries())) {
    const [email, count] = entry
    if (count > maxCount) {
      maxCount = count
      primaryEditor = email
    }
  }

  // Generate integrity hash (deterministic JSON)
  const hashData = JSON.stringify({
    activeDays,
    activeSessions,
    firstEditAt,
    lastEditAt,
    primaryEditor,
    revisionCount,
    timeSpanDays,
    uniqueEditors,
  })

  const proofHash = createHash('sha256').update(hashData).digest('hex')

  return {
    revisionCount,
    firstEditAt,
    lastEditAt,
    timeSpanDays,
    activeDays,
    activeSessions,
    uniqueEditors,
    primaryEditor,
    editPattern: sessions,
    proofHash,
  }
}

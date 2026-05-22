/**
 * Google API Service
 * 
 * Owns: all calls to Google Drive API v3 and Google Drive Activity API v2
 * Does not own: proof calculation logic, storage, or any I/O
 * Technology: googleapis npm package
 */

import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'

export type NormalisedDocument = {
  id: string
  name: string
  mimeType: string
  modifiedTime: string
  webViewLink: string
}

export type RawRevisionData = {
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

export class GoogleAPIError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message)
    this.name = 'GoogleAPIError'
  }
}

export class InsufficientHistoryError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InsufficientHistoryError'
  }
}

/**
 * List user's Google Drive documents (Docs, Sheets, Slides)
 */
export async function listDocuments(accessToken: string): Promise<NormalisedDocument[]> {
  const auth = new google.auth.OAuth2()
  auth.setCredentials({ access_token: accessToken })
  
  const drive = google.drive({ version: 'v3', auth })
  
  try {
    const response = await drive.files.list({
      q: `mimeType='application/vnd.google-apps.document' 
          OR mimeType='application/vnd.google-apps.spreadsheet' 
          OR mimeType='application/vnd.google-apps.presentation'
          and trashed = false`,
      fields: 'files(id,name,mimeType,modifiedTime,webViewLink)',
      orderBy: 'modifiedTime desc',
      pageSize: 50,
    })
    
    return (response.data.files || []).map(file => ({
      id: file.id!,
      name: file.name!,
      mimeType: file.mimeType!,
      modifiedTime: file.modifiedTime!,
      webViewLink: file.webViewLink!,
    }))
  } catch (error: any) {
    throw new GoogleAPIError(
      `Failed to list documents: ${error.message}`,
      error.response?.status
    )
  }
}

/**
 * Get revision history and activity data for a document
 */
export async function getDocumentRevisionData(
  accessToken: string,
  fileId: string
): Promise<RawRevisionData> {
  const auth = new google.auth.OAuth2()
  auth.setCredentials({ access_token: accessToken })
  
  const drive = google.drive({ version: 'v3', auth })
  const driveActivity = google.driveactivity({ version: 'v2', auth })
  
  // Part A: Drive Revisions API
  const revisions: Array<{ id: string; modifiedTime: string; editorEmail: string | null }> = []
  let nextPageToken: string | undefined
  
  try {
    do {
      const response = await drive.revisions.list({
        fileId,
        fields: 'revisions(id,modifiedTime,lastModifyingUser/emailAddress)',
        pageSize: 1000,
        pageToken: nextPageToken,
      })
      
      const batch = (response.data.revisions || []).map(rev => ({
        id: rev.id!,
        modifiedTime: rev.modifiedTime!,
        editorEmail: rev.lastModifyingUser?.emailAddress || null,
      }))
      revisions.push(...batch)
      nextPageToken = response.data.nextPageToken || undefined
    } while (nextPageToken)
  } catch (error: any) {
    throw new GoogleAPIError(
      `Failed to retrieve revisions: ${error.message}`,
      error.response?.status
    )
  }
  
  // Check for insufficient history
  if (revisions.length < 3) {
    throw new InsufficientHistoryError(
      `This document has only ${revisions.length} revision(s). ` +
      'A meaningful Work Proof requires at least 3 revisions.'
    )
  }
  
  // Part B: Drive Activity API
  let activityEvents: Array<{ timestamp: string; editorEmail: string | null; actionType: string }> = []
  
  try {
    const response = await driveActivity.activity.query({
      requestBody: {
        itemName: `items/${fileId}`,
      },
    })
    
    activityEvents = (response.data.activities || []).flatMap(activity => {
      const timestamp = typeof activity.timestamp === 'string' 
        ? activity.timestamp 
        : (activity.timestamp as any)?.seconds?.toString() || ''
      const actors = activity.actors || []
      const actions = activity.actions || []
      
      return actors.map(actor => ({
        timestamp,
        editorEmail: (actor as any).user?.emailAddress || null,
        actionType: typeof actions[0]?.detail === 'string' 
          ? actions[0].detail 
          : 'unknown',
      }))
    })
  } catch (error: any) {
    // Activity API failure is not fatal — continue with revisions only
    console.warn('Drive Activity API failed:', error.message)
  }
  
  return { revisions, activityEvents }
}

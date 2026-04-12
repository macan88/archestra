import { z } from 'zod';

export const ConnectorTypeSchema = z.enum([
  'confluence',
  'jira',
  'google_drive', // add Google Drive connector type
]);
export const ConnectorCheckpointSchema = z.object({
  syncToken: z.string(),
});
export const ConnectorConfigSchema = z.object({
  // ... other connector config properties
});
export const ConnectorSyncStatusSchema = z.enum([
  'success',
  'failure',
]);
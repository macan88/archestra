import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import { z } from 'zod';
import { schema } from '@/database';
import { KnowledgeSourceVisibilitySchema } from './knowledge-base';
import {
  ConnectorCheckpointSchema,
  ConnectorConfigSchema,
  ConnectorSyncStatusSchema,
  ConnectorTypeSchema,
} from './knowledge-connector';

// ===== Knowledge Base Schemas =====

export const SelectKnowledgeBaseSchema = createSelectSchema(
  schema.knowledgeBasesTable,
);
export const InsertKnowledgeBaseSchema = createInsertSchema(
  schema.knowledgeBasesTable,
).omit({ id: true, createdAt: true, updatedAt: true });
export const UpdateKnowledgeBaseSchema = createUpdateSchema(
  schema.knowledgeBasesTable,
).pick({
  name: true,
  description: true,
  status: true,
});

export type KnowledgeBase = z.infer<typeof SelectKnowledgeBaseSchema>;
export type InsertKnowledgeBase = z.infer<typeof InsertKnowledgeBaseSchema>;
export type UpdateKnowledgeBase = z.infer<typeof UpdateKnowledgeBaseSchema>;

// ===== Knowledge Base Connector Schemas =====

const NullableConnectorSyncStatusSchema = ConnectorSyncStatusSchema.nullable();

export const SelectKnowledgeBaseConnectorSchema = createSelectSchema(
  schema.knowledgeBaseConnectorsTable,
  {
    visibility: KnowledgeSourceVisibilitySchema,
    teamIds: z.array(z.string()),
    connectorType: ConnectorTypeSchema,
    config: ConnectorConfigSchema,
    lastSyncStatus: NullableConnectorSyncStatusSchema,
  },
);;
export const InsertKnowledgeBaseConnectorSchema = createInsertSchema(
  schema.knowledgeBaseConnectorsTable,
  {
    visibility: KnowledgeSourceVisibilitySchema.optional(),
    teamIds: z.array(z.string()).optional(),
    connectorType: ConnectorTypeSchema,
    config: ConnectorConfigSchema,
    checkpoint: ConnectorCheckpointSchema.optional(),
    lastSyncStatus: NullableConnectorSyncStatusSchema.optional(),
  },
).omit({ id: true, createdAt: true, updatedAt: true });
export const UpdateKnowledgeBaseConnectorSchema = createUpdateSchema(
  schema.knowledgeBaseConnectorsTable,
  {
    visibility: KnowledgeSourceVisibilitySchema.optional(),
    teamIds: z.array(z.string()).optional(),
    connectorType: ConnectorTypeSchema.optional(),
    config: ConnectorConfigSchema.optional(),
    checkpoint: ConnectorCheckpointSchema.nullable().optional(),
    lastSyncStatus: NullableConnectorSyncStatusSchema.optional(),
  },
).pick({
  name: true,
  description: true,
  visibility: true,
  teamIds: true,
  config: true,
  secretId: true,
  schedule: true,
  enabled: true,
  lastSyncAt: true,
  lastSyncStatus: true,
  lastSyncError: true,
  checkpoint: true,
});

export type KnowledgeBaseConnector = z.infer<typeof SelectKnowledgeBaseConnectorSchema>;
export type InsertKnowledgeBaseConnector = z.infer<typeof InsertKnowledgeBaseConnectorSchema>;
export type UpdateKnowledgeBaseConnector = z.infer<typeof UpdateKnowledgeBaseConnectorSchema>;

// Google Drive connector type
export const GoogleDriveConnectorType = z.enum(['google_drive']);

// Update the connector type schema to include Google Drive
export const UpdatedConnectorTypeSchema = z.union([
  ConnectorTypeSchema,
  GoogleDriveConnectorType,
]);

// Google Drive connector config schema
export const GoogleDriveConnectorConfigSchema = z.object({
  clientId: z.string(),
  clientSecret: z.string(),
  refreshToken: z.string(),
  driveId: z.string().optional(),
  folderId: z.string().optional(),
  fileTypes: z.array(z.string()).optional(),
});

// Update the connector config schema to include Google Drive
export const UpdatedConnectorConfigSchema = z.union([
  ConnectorConfigSchema,
  GoogleDriveConnectorConfigSchema,
]);
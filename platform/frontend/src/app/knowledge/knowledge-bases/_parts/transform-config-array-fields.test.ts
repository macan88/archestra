import { transformConfigArrayFields } from './transform-config-array-fields';
import { KnowledgeBaseConnector } from '../../types/knowledge-base-connector';

describe('transformConfigArrayFields', () => {
  it('should transform array fields correctly', () => {
    const config: KnowledgeBaseConnector['config'] = {
      driveId: '123',
      folderId: '456',
      fileTypes: ['docx', 'pdf'],
    };
    const transformedConfig = transformConfigArrayFields(config);
    expect(transformedConfig.driveId).toBe('123');
    expect(transformedConfig.folderId).toBe('456');
    expect(transformedConfig.fileTypes).toEqual(['docx', 'pdf']);
  });
});
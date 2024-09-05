import StreamingPlatform from './streaming-platform.entity';
import StreamingPlatformId from './value-objects/streaming-platform-id.value-object';

export interface IStreamingPlatformRepository {
  save(streamingPlatform: StreamingPlatform): Promise<void>;
  findById(id: StreamingPlatformId): Promise<StreamingPlatform | null>;
}

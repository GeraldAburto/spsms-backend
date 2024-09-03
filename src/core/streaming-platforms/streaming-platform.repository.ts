import StreamingPlatform from './streaming-platform.entity';

export interface IStreamingPlatformRepository {
  save(streamingPlatform: StreamingPlatform): Promise<void>;
}

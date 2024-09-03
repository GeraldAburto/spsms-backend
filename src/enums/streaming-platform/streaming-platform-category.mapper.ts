import { StreamingPlatformCategory as DomainStreamingPlatformCategory } from '@/core/streaming-platforms/enums/streaming-platform-category.enum';
import { StreamingPlatformCategory } from './streaming-platform-category.enum';

export const StreamingPlatformCategoryMapper: Record<
  DomainStreamingPlatformCategory,
  StreamingPlatformCategory
> = {
  [DomainStreamingPlatformCategory.Business]:
    StreamingPlatformCategory.Business,
  [DomainStreamingPlatformCategory.Education]:
    StreamingPlatformCategory.Education,
  [DomainStreamingPlatformCategory.Entertainment]:
    StreamingPlatformCategory.Entertainment,
  [DomainStreamingPlatformCategory.Personal]:
    StreamingPlatformCategory.Personal,
  [DomainStreamingPlatformCategory.HealthAndFitness]:
    StreamingPlatformCategory.HealthAndFitness,
  [DomainStreamingPlatformCategory.NoCategory]:
    StreamingPlatformCategory.NoCategory,
};

export const DomainStreamingPlatformCategoryMapper: Record<
  StreamingPlatformCategory,
  DomainStreamingPlatformCategory
> = {
  [StreamingPlatformCategory.Business]:
    DomainStreamingPlatformCategory.Business,
  [StreamingPlatformCategory.Education]:
    DomainStreamingPlatformCategory.Education,
  [StreamingPlatformCategory.Entertainment]:
    DomainStreamingPlatformCategory.Entertainment,
  [StreamingPlatformCategory.Personal]:
    DomainStreamingPlatformCategory.Personal,
  [StreamingPlatformCategory.HealthAndFitness]:
    DomainStreamingPlatformCategory.HealthAndFitness,
  [StreamingPlatformCategory.NoCategory]:
    DomainStreamingPlatformCategory.NoCategory,
};

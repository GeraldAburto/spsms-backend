import { StreamingPlatformBilling as DomainStreamingPlatformBilling } from '@/core/streaming-platforms/enums/streaming-platform-billing.enum';
import { StreamingPlatformBilling } from './streaming-platform-billing.enum';

export const StreamingPlatformBillingMapper: Record<
  DomainStreamingPlatformBilling,
  StreamingPlatformBilling
> = {
  [DomainStreamingPlatformBilling.Monthly]: StreamingPlatformBilling.Monthly,
  [DomainStreamingPlatformBilling.Quarterly]:
    StreamingPlatformBilling.Quarterly,
  [DomainStreamingPlatformBilling.Weekly]: StreamingPlatformBilling.Weekly,
  [DomainStreamingPlatformBilling.Yearly]: StreamingPlatformBilling.Yearly,
};

export const DomainStreamingPlatformBillingMapper: Record<
  StreamingPlatformBilling,
  DomainStreamingPlatformBilling
> = {
  [StreamingPlatformBilling.Monthly]: DomainStreamingPlatformBilling.Monthly,
  [StreamingPlatformBilling.Quarterly]:
    DomainStreamingPlatformBilling.Quarterly,
  [StreamingPlatformBilling.Weekly]: DomainStreamingPlatformBilling.Weekly,
  [StreamingPlatformBilling.Yearly]: DomainStreamingPlatformBilling.Yearly,
};

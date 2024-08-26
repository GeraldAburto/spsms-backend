import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { IUUIDGenerator } from '@/core/shared/uuid-generator.service';

@Injectable()
export class UUIDGeneratorService implements IUUIDGenerator {
  generate(): string {
    return uuidv4();
  }
}

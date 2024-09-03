import { StreamingPlatformBilling } from '@/enums/streaming-platform/streaming-platform-billing.enum';
import { StreamingPlatformCategory } from '@/enums/streaming-platform/streaming-platform-category.enum';
import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

type StreamingPlatformModelCreationAttributes = Pick<
  StreamingPlatformModel,
  'id' | 'userId' | 'name' | 'category' | 'cost' | 'billing' | 'date'
>;

@Table({
  tableName: 'streaming_platforms',
  underscored: true,
  timestamps: false,
})
export class StreamingPlatformModel extends Model<
  StreamingPlatformModel,
  StreamingPlatformModelCreationAttributes
> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  userId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.ENUM(...Object.values(StreamingPlatformCategory)),
    allowNull: false,
  })
  category: StreamingPlatformCategory;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  cost: number;

  @Column({
    type: DataType.ENUM(...Object.values(StreamingPlatformBilling)),
    allowNull: false,
  })
  billing: StreamingPlatformBilling;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  date: Date;
}

import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

type UserModelCreationAttributes = Pick<
  UserModel,
  'id' | 'email' | 'firstName' | 'lastName' | 'passwordHash'
>;

@Table({
  tableName: 'users',
  underscored: true,
  timestamps: false,
})
export class UserModel extends Model<UserModel, UserModelCreationAttributes> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  passwordHash: string;
}

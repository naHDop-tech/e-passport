import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';

import { Address } from '~/graphql.schema';
import { UserEntity } from '~/user/user.entity';

@Entity('user_addresses')
export class AddressEntity extends Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  line1: string;

  @Column()
  line2: string;

  @Column()
  zip: string;

  @CreateDateColumn({ name: 'created_at', default: 'now()' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', default: 'now()' })
  updatedAt: string;

  @OneToOne(() => UserEntity, (user) => user.address)
  user: UserEntity;
}

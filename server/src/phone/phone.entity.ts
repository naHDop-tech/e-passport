import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';

import { Phone } from '~/graphql.schema';
import { UserEntity } from '~/user/user.entity';

@Entity('user_phones')
export class PhoneEntity extends Phone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'country_code' })
  countryCode: number;

  @Column({ name: 'number' })
  number: number;

  @CreateDateColumn({ name: 'created_at', default: 'now()' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', default: 'now()' })
  updatedAt: string;

  @OneToOne(() => UserEntity, (user) => user.phone)
  user: UserEntity;
}

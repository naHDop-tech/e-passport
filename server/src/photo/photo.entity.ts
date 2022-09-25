import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';

import { Photo } from '~/graphql.schema';
import { UserEntity } from '~/user/user.entity';

@Entity('user_photos')
export class PhotoEntity extends Photo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  filename: string;

  @Column()
  mimetype: string;

  @Column()
  encoding: string;

  @CreateDateColumn({ name: 'created_at', default: 'now()' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', default: 'now()' })
  updatedAt: string;

  @OneToOne(() => UserEntity, (user) => user.photo)
  user: UserEntity;
}

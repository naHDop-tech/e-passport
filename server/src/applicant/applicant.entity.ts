import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

import { Applicant } from '~/graphql.schema';
import { UserEntity } from '~/user/user.entity';

@Entity('applicants')
export class ApplicantEntity extends Applicant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ name: 'created_at', default: 'now()' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @OneToOne(() => UserEntity, (user) => user.applicant)
  user: UserEntity;
}

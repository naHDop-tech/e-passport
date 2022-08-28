import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '~/graphql.schema';
import { ApplicantEntity } from '~/applicant/applicant.entity';

@Entity('users')
export class UserEntity extends User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  secondName: string;

  @Column()
  age: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'birth_date' })
  birthDate: string;

  @CreateDateColumn({ name: 'created_at', default: 'now()' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @Column({ name: 'country_resident' })
  countryResident: string;

  @Column({ name: 'is_verified' })
  isVerified: boolean;

  @Column({ name: 'applicant_id', type: 'uuid' })
  applicantId: string;

  @OneToOne(() => ApplicantEntity)
  @JoinColumn({ name: 'applicant_id' })
  applicant: ApplicantEntity;
}

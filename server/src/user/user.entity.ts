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
  lastName: string;

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

  @Column({ name: 'is_verified', default: false })
  isVerified: boolean;

  @OneToOne(() => ApplicantEntity, (applicant) => applicant.user)
  @JoinColumn({ name: 'applicant_id', referencedColumnName: 'id' })
  applicant: ApplicantEntity;
}

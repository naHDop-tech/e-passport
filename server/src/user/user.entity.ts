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
import { PhotoEntity } from '~/photo/photo.entity';
import { PhoneEntity } from '~/phone/phone.entity';

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

  @OneToOne(() => PhotoEntity, (photo) => photo.user, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'photo_id', referencedColumnName: 'id' })
  photo: PhotoEntity;

  @OneToOne(() => PhoneEntity, (phone) => phone.user, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'phone_id', referencedColumnName: 'id' })
  phone: PhoneEntity;
}

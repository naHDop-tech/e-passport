import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '~/graphql.schema';

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

  @Column({ name: 'country_resident' })
  countryResident: string;

  @Column({ name: 'is_verified' })
  isVerified: boolean;
}

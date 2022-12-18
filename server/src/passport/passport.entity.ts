import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    OneToOne, JoinColumn,
} from 'typeorm';

import { Passport } from '~/graphql.schema';
import { UserEntity } from '~/user/user.entity';
import { FingerprintEntity } from '~/fingerprint/fingerprint.entity';

@Entity('passports')
export class PassportEntity extends Passport {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ name: 'issuing_organization'})
    issuingOrganization: string

    @Column({ name: 'mrz' })
    mrz: string;

    @Column({ name: 'u_number' })
    uNumber: string;

    @Column({ name: 'p_number' })
    pNumber: string;

    @Column({ name: 'nationality_code' })
    nationalityCode: string;

    @Column({ name: 'issue_date' })
    issueDate: string;

    @Column({ name: 'expiration_date' })
    expirationDate: string;

    @Column({ name: 'place_of_birth' })
    placeOfBirth: string;

    @Column({ name: 'type' })
    type: string;

    @CreateDateColumn({ name: 'created_at', default: 'now()' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at', default: 'now()' })
    updatedAt: string;

    @OneToOne(() => UserEntity, (user) => user.passport)
    user: UserEntity;

    @OneToOne(() => FingerprintEntity, (fingerprint) => fingerprint.passport, {
        eager: true,
        cascade: true,
    })
    @JoinColumn({ name: 'fingerprint_id', referencedColumnName: 'id' })
    fingerprint: FingerprintEntity;
}

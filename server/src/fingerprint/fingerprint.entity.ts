import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    OneToOne,
} from 'typeorm';

import { Fingerprint } from '~/graphql.schema';
import { PassportEntity } from '~/passport/passport.entity';

@Entity('fingerprints')
export class FingerprintEntity extends Fingerprint {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'public_key'})
    publicKey: string

    @CreateDateColumn({ name: 'created_at', default: 'now()' })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at', default: 'now()' })
    updatedAt: string;

    @OneToOne(() => PassportEntity, (passport) => passport.fingerprint)
    passport: PassportEntity;
}

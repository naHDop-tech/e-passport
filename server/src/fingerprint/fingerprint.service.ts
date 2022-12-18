import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { FingerprintEntity } from '~/fingerprint/fingerprint.entity';
import { UpdateFingerprintDto } from '~/fingerprint/dto/update-fingerprint.dto';

@Injectable()
export class FingerprintService {
    constructor(
        @InjectRepository(FingerprintEntity)
        private readonly fingerprintRepository: Repository<FingerprintEntity>,
    ) {}

    async updateFingerPrint(
        payload: UpdateFingerprintDto,
        passportId: string,
    ): Promise<FingerprintEntity> {
        const fingerprint = await this.fingerprintRepository.findOne({
            where: { passport: { id: passportId } },
        });
        
        if (!fingerprint) {
            throw new NotFoundException("Fingerprint not found")
        }
        fingerprint.publicKey = payload.publicKey;

        return await this.fingerprintRepository.save(fingerprint);
    }

    async createFingerprint(
        payload: UpdateFingerprintDto,
    ): Promise<FingerprintEntity> {
        const { publicKey } = payload

        const fingerprint = this.fingerprintRepository.create({
            publicKey,
        })

        return await this.fingerprintRepository.save(fingerprint)
    }
}

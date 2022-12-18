import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserService } from '~/user/user.service';
import { PassportEntity } from '~/passport/passport.entity';
import { FingerprintService } from '~/fingerprint/fingerprint.service';
import { UserEntity } from '~/user/user.entity';
import { UpdatePassportDto } from '~/passport/dto/update-passport.dto';
import { DateCalculatorService } from "~/utils/date-calculator.service";

@Injectable()
export class UserPassportService {
    constructor(
        @InjectRepository(PassportEntity)
        private readonly userPassportRepository: Repository<PassportEntity>,
        private readonly dateCalculatorService: DateCalculatorService,
        private readonly userService: UserService,
        private readonly fingerprintService: FingerprintService,
    ) {}

    async save(passport: PassportEntity): Promise<PassportEntity> {
        return await this.userPassportRepository.save(passport);
    }

    async changeUserPassport(
        payload: UpdatePassportDto,
        userId: string,
    ): Promise<PassportEntity> {
        const applicantUser = await this.userService.findById(userId);

        if (!applicantUser) {
            throw new NotFoundException('User not found');
        }

        if (!applicantUser?.passport?.id) {
            return this.createPassport(payload, applicantUser);
        } else {
            return this.updatePassport(payload, userId);
        }
    }

    private async updatePassport(
        payload: UpdatePassportDto,
        userId: string,
    ): Promise<PassportEntity> {
        const userPassport = await this.userPassportRepository.findOne({
            where: { user: { id: userId } },
        });
        userPassport.nationalityCode = payload.nationalityCode;
        userPassport.placeOfBirth = payload.placeOfBirth;
        
        if (payload.publicKey) {
            userPassport.fingerprint = await this.fingerprintService.updateFingerPrint({
                publicKey: payload.publicKey
            }, userPassport.id)
        }

        return await this.userPassportRepository.save(userPassport);
    }

    private async createPassport(
        payload: UpdatePassportDto,
        user: UserEntity,
    ): Promise<PassportEntity> {
        const { nationalityCode, placeOfBirth, publicKey } = payload
        const dateNow = new Date()
        const fingerprint = await this.fingerprintService.createFingerprint({ publicKey })
        const passport: Omit<PassportEntity, 'id' | 'createdAt' | 'updatedAt'> = {
            nationalityCode,
            placeOfBirth,
            issuingOrganization: '',
            identifier: '',
            uNumber: '',
            pNumber: '',
            issueDate: dateNow.toISOString(),
            expirationDate: this.dateCalculatorService.getDateInFuture(dateNow).toISOString(),
            type: 'P',
            fingerprint,
            user,
        }
        user.passport = this.userPassportRepository.create(passport);

        await this.userService.save(user);

        return user.passport;
    }
}

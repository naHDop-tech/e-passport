import { Injectable, NotFoundException} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserService } from '~/user/user.service';
import { PassportUtilsService } from '~/utils/passport-utils.service';
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
        private readonly passportUtilsService: PassportUtilsService
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
        const user = await this.userService.findById(userId)
        if (payload.placeOfBirth) {
            userPassport.placeOfBirth = payload.placeOfBirth;
        }
        if (payload.publicKey) {
            userPassport.fingerprint = await this.fingerprintService.updateFingerPrint({
                publicKey: payload.publicKey
            }, userPassport.id)
        }

        const { mrzL2, mrzL1 } = this.passportUtilsService.getMachineReadableZoneLines({
            type: 'P',
            sex: user.sex,
            countryCode: userPassport.countryCode,
            firstName: user.firstName.toUpperCase(),
            lastName: user.lastName.toUpperCase(),
            pNumber: userPassport.pNumber,
            uNumber: userPassport.uNumber,
            nationality: user.nationality.slice(0, 3).toUpperCase(),
            expirationDate: new Date(userPassport.expirationDate),
            dateOfBirth: new Date(user.birthDate)
        })

        userPassport.mrzL1 = mrzL1
        userPassport.mrzL2 = mrzL2

        return await this.userPassportRepository.save(userPassport);
    }

    private async createPassport(
        payload: UpdatePassportDto,
        user: UserEntity,
    ): Promise<PassportEntity> {
        const { placeOfBirth, publicKey } = payload
        const issueDate = new Date()
        const expirationDate = this.dateCalculatorService.getDateInFuture(new Date())
        const fingerprint = await this.fingerprintService.createFingerprint({ publicKey })
        const pNumber = this.passportUtilsService.getPassportNumber()
        const uNumber = this.passportUtilsService.getUserNumber({
            firstName: user.firstName,
            lastName: user.lastName,
            placeOfBirth,
        })
        const { mrzL2, mrzL1 } = this.passportUtilsService.getMachineReadableZoneLines({
            type: 'P',
            sex: user.sex,
            countryCode: user.nationality.slice(0, 3).toUpperCase(),
            firstName: user.firstName.toUpperCase(),
            lastName: user.lastName.toUpperCase(),
            pNumber,
            uNumber,
            nationality: user.nationality.slice(0, 3).toUpperCase(),
            expirationDate,
            dateOfBirth: new Date(user.birthDate)
        })
        const passport: Omit<PassportEntity, 'id' | 'createdAt' | 'updatedAt'> = {
            countryCode: user.nationality.slice(0, 3).toUpperCase(),
            placeOfBirth,
            issuingOrganization: 'International Digital Docs',
            mrzL1,
            mrzL2,
            uNumber,
            pNumber,
            issueDate: issueDate.toISOString(),
            expirationDate: expirationDate.toISOString(),
            type: 'P',
            fingerprint,
            user,
        }
        user.passport = this.userPassportRepository.create(passport);

        await this.userService.save(user);

        return user.passport;
    }
}

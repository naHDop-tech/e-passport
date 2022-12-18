import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserService } from '~/user/user.service';
import { PassportEntity } from '~/passport/passport.entity';
import { UserEntity } from '~/user/user.entity';
import { UpdatePassportDto } from '~/passport/dto/update-passport.dto';
import {DateCalculatorService} from "~/utils/date-calculator.service";

@Injectable()
export class UserPassportService {
    constructor(
        @InjectRepository(PassportEntity)
        private readonly userPassportRepository: Repository<PassportEntity>,
        private readonly dateCalculatorService: DateCalculatorService,
        private readonly userService: UserService,
    ) {}

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

        return await this.userPassportRepository.save(userPassport);
    }

    private async createPassport(
        payload: UpdatePassportDto,
        user: UserEntity,
    ): Promise<PassportEntity> {
        const { nationalityCode, placeOfBirth } = payload
        const dateNow = new Date()
        const passport: Omit<PassportEntity, 'id' | 'user' | 'createdAt' | 'updatedAt'> = {
            nationalityCode,
            placeOfBirth,
            issuingOrganization: '',
            identifier: '',
            uNumber: '',
            pNumber: '',
            issueDate: dateNow.toISOString(),
            expirationDate: this.dateCalculatorService.getDateInFuture(dateNow).toISOString(),
            type: 'P',
        }
        user.passport = this.userPassportRepository.create(passport);

        await this.userService.save(user);

        return user.passport;
    }
}

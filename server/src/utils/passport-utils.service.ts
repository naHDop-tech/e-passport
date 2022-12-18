import { Injectable } from '@nestjs/common';
import { Sex } from "~/user/user.interfaces";

export interface IMRZLines {
    mrzL1: string
    mrzL2: string
}

export interface IMRZLinesProps {
    type:  string
    sex: Sex
    countryCode: string
    firstName: string
    lastName: string
    pNumber: string
    uNumber: string
    nationality: string
    expirationDate: Date
    dateOfBirth: Date
}

const LINE_LENGTH = 44

@Injectable()
export class PassportUtilsService {
    getMachineReadableZoneLines(payload: IMRZLinesProps): IMRZLines {
        let mrzL1 = ''
        let mrzL2 = ''
        
        if (payload.nationality.length > 3 || payload.countryCode.length > 3) {
            throw new Error("Nationality or country code should have 3 letter of length")
        }
        
        const check1 = this.randomIntFromInterval(1, 9)
        const check2 = this.randomIntFromInterval(1, 9)
        const check3 = this.randomIntFromInterval(1, 9)
        const checkSum = this.simpleHash(`${check1}${check2}${check3}`)
        const sexId = payload.sex.charAt(0)
        const dateOfBirth = `${payload.dateOfBirth.getFullYear().toString().slice(-2)}${payload.dateOfBirth.getMonth()}${payload.dateOfBirth.getDate()}`
        const expirationDate = `${payload.expirationDate.getFullYear().toString().slice(-2)}${payload.expirationDate.getMonth()}${payload.expirationDate.getDate()}`

        // Build line 1
        mrzL1 += `${payload.type}<${payload.countryCode}${payload.firstName}<<${payload.lastName}`
        
        if (mrzL1.length >= LINE_LENGTH) {
            throw new Error('Data for line 1 is too long')
        }
        while (mrzL1.length < LINE_LENGTH) {
            mrzL1 += '<'
        }

        // Build line 2
        mrzL2 += `${payload.pNumber}<${check1}${payload.nationality}${dateOfBirth}${check2}${sexId}${expirationDate}${check3}${payload.uNumber}`

        if (mrzL1.length >= LINE_LENGTH) {
            throw new Error('Data for line 2 is too long')
        }
        while (mrzL1.length < LINE_LENGTH) {
            if (mrzL2.length === 41) {
                mrzL2 += checkSum
                break
            }
            mrzL2 += '<'
        }

        return {
            mrzL1,
            mrzL2,
        }
    }

    private simpleHash(str: string): string {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash &= hash; // Convert to 32bit integer
        }
        return new Uint32Array([hash])[0].toString(36);
    };

    private randomIntFromInterval(min, max): number {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}

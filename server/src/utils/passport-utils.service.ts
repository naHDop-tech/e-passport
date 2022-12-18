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
    expirationDate: string
    dateOfBirth: string
}

const LINE_LENGTH = 44

@Injectable()
export class PassportUtilsService {
    getMachineReadableZoneLines(payload: IMRZLinesProps): IMRZLines {
        let mrzL1 = ''
        let mrzL2 = ''

        // Build line 1
        mrzL1 += `${payload.type}<${payload.countryCode}${payload.firstName}<<${payload.lastName}`
        
        if (mrzL1.length >= LINE_LENGTH) {
            throw new Error('Data for line 1 is too long')
        }
        while (mrzL1.length < LINE_LENGTH) {
            mrzL1 += '<'
        }
        
        const sexId = payload.sex.charAt(0)
        // Build line 2
        mrzL2 += `${payload.pNumber}<${7}${payload.nationality}${payload.dateOfBirth}${4}${sexId}${payload.expirationDate}${7}${payload.uNumber}`

        if (mrzL1.length >= LINE_LENGTH) {
            throw new Error('Data for line 2 is too long')
        }
        while (mrzL1.length < LINE_LENGTH) {
            if (mrzL2.length === 42) {
                mrzL2 += '7'
                continue
            }
            if (mrzL2.length === 43) {
                mrzL2 += '8'
                continue
            }
            mrzL2 += '<'
        }

        return {
            mrzL1,
            mrzL2,
        }
    }
}

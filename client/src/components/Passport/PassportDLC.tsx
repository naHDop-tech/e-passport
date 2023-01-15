import { Passport, IPassportProps } from './PassportView'
import { useUserInfo } from "@hooks/useUserInfo";
import { usePassportDateFormat } from '@hooks/usePassportDateFormat'
import { PassportFormDlc } from "@components/Passport/PassportView/PassportForm/PassportFormDLC";

export function PassportDlc() {
    const { user } = useUserInfo()
    const holderBirthDate = usePassportDateFormat(new Date(user.birthDate as string))
    const holderExpireDate = usePassportDateFormat(new Date(user.passport?.expirationDate as string))
    const holderIssueDate = usePassportDateFormat(new Date(user.passport?.issueDate as string))

    console.log(user)
    
    const data: IPassportProps = {
        authorityFull: "PASSPORT OFFICE",
        authorityOrg: "Digital documents Inc.",
        countryCode: user.passport?.countryCode as string,
        dateOfBirth: holderBirthDate,
        dateOfExpiry: holderExpireDate,
        dateOfIssue: holderIssueDate,
        firstName: user.firstName?.toUpperCase() as string,
        lastName: user.lastName?.toUpperCase() as string,
        nationality: user.nationality?.toUpperCase() as string,
        pNumber: user.passport?.pNumber as string,
        photoSrc: user.photo?.encoding as string,
        placeOfBirth: user.passport?.placeOfBirth as string,
        sex: user.sex?.toUpperCase().slice(0, 1) as string,
        signature: `${user.firstName} ${user.lastName}`,
        type: "P",
        uNumber: user.passport?.uNumber as string,
        mrl1: user.passport?.mrzL1 as string,
        mrl2: user.passport?.mrzL2 as string,
    }

    return (
        <>
            <Passport {...data} />
            <PassportFormDlc />
        </>
    );
}

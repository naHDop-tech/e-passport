import { Passport, IPassportProps } from './PassportView'

export function PassportDlc() {
    const data: IPassportProps = {
        authorityFull: "PASSPORT OFFICE",
        authorityOrg: "Digital documents Inc.",
        countryCode: "UTO",
        dateOfBirth: "12 AUG 1974",
        dateOfExpiry: "16 APR 2032",
        dateOfIssue: "16 APR 2022",
        firstName: "ANNA MARIA",
        lastName: "ERIKSSON",
        nationality: "UTOPIAN",
        pNumber: "L898902C3",
        photoSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT80lmS918O4AJ-A197bvSjLY9CTHZNmyi4AA&usqp=CAU",
        placeOfBirth: "ZENITH",
        sex: "F",
        signature: "Anna Maria Eriksson",
        type: "P",
        uNumber: "ZE184266B",
        mrl1: 'P<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<<<<<<<<<',
        mrl2: 'L898902C36<UTO7408122F1604229ZE184266B<<<<10',
    }
    return (
        <Passport {...data} />
    );
}

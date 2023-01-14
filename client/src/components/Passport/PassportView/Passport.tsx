import cn from 'classnames';

import s from './Passport.module.css'
const styles = s as unknown as IPassportStyle

interface IPassportStyle {
    Box: string
    Passport: string
    Mrz: string
    Uinfo: string
    Z1: string
    Mrl1: string
    Mrl2: string
    MrlDelimiter: string
    MainUInfo: string
    CompanyName: string
    PhotoSide: string
    InfoSide: string
    PhotoZone: string
    InfoRow: string
    LastInfoRow: string

    Type: string
    Z4: string
    DateOfBirth: string
    Sex: string
    DateOfIssue: string
    DateOfExpiry: string
    PhotoInfo: string
    Label: string
    Field: string
    PassportNumber: string
    LongItemLeft: string
    LongItemRight: string
    Signature: string
}

export interface IPassportProps {
    authorityOrg: string
    photoSrc: string
    type: string
    countryCode: string
    pNumber: string
    uNumber: string
    firstName: string
    lastName: string
    nationality: string
    dateOfBirth: string
    sex: string
    placeOfBirth: string
    dateOfIssue: string
    authorityFull: string
    dateOfExpiry: string
    signature: string
    mrl1: string
    mrl2: string
}

export function Passport(props: IPassportProps) {
    return (
        <div className={styles.Box}>
            <div className={styles.Passport}>
                <div className={styles.Uinfo}>
                    <div className={styles.Z1}>{props.authorityOrg}</div>
                    <div className={styles.MainUInfo}>
                        <div className={styles.PhotoSide}>
                            <div className={styles.PhotoInfo}>Passport</div>
                            <div className={styles.PhotoZone}>
                                <img width = "165" height = "215" src={props.photoSrc} alt="Holder's photo"/>
                            </div>
                        </div>
                        <div className={styles.InfoSide}>
                            <div className={styles.InfoRow}>
                                <div className={styles.Type}>
                                    <div className={styles.Label}>Type</div>
                                    <div className={styles.Field}>{props.type}</div>
                                </div>
                                <div className={styles.Z4}>
                                    <div className={styles.Label}>Country code</div>
                                    <div className={styles.Field}>{props.countryCode}</div>
                                </div>
                                <div className={styles.PassportNumber}>
                                    <div className={styles.Label}>Passport No</div>
                                    <div className={styles.Field}>{props.pNumber}</div>
                                </div>
                            </div>
                            <div className={styles.InfoRow}>
                                <div className={styles.LongItemLeft}>
                                    <div className={styles.Label}>Surname</div>
                                    <div className={styles.Field}>{props.lastName}</div>
                                </div>
                            </div>
                            <div className={styles.InfoRow}>
                                <div className={styles.LongItemLeft}>
                                    <div className={styles.Label}>Name</div>
                                    <div className={styles.Field}>{props.firstName}</div>
                                </div>
                            </div>
                            <div className={styles.InfoRow}>
                                <div className={styles.LongItemLeft}>
                                    <div className={styles.Label}>Nationality</div>
                                    <div className={styles.Field}>{props.nationality}</div>
                                </div>
                            </div>
                            <div className={styles.InfoRow}>
                                <div className={styles.DateOfBirth}>
                                    <div className={styles.Label}>Date of birth</div>
                                    <div className={styles.Field}>{props.dateOfBirth}</div>
                                </div>
                                <div className={styles.PassportNumber}>
                                    <div className={styles.Label}>Personal number</div>
                                    <div className={styles.Field}>{props.uNumber}</div>
                                </div>
                            </div>
                            <div className={styles.InfoRow}>
                                <div className={styles.Sex}>
                                    <div className={styles.Label}>Sex</div>
                                    <div className={styles.Field}>{props.sex}</div>
                                </div>
                                <div className={styles.LongItemRight}>
                                    <div className={styles.Label}>Place of birth</div>
                                    <div className={styles.Field}>{props.placeOfBirth}</div>
                                </div>
                            </div>
                            <div className={styles.InfoRow}>
                                <div className={styles.DateOfIssue}>
                                    <div className={styles.Label}>Date of issue</div>
                                    <div className={styles.Field}>{props.dateOfIssue}</div>
                                </div>
                                <div className={styles.PassportNumber}>
                                    <div className={styles.Label}>Authority</div>
                                    <div className={styles.Field}>{props.authorityFull}</div>
                                </div>
                            </div>
                            <div className={styles.LastInfoRow}>
                                <div className={styles.DateOfExpiry}>
                                    <div className={styles.Label}>Date of expiry</div>
                                    <div className={styles.Field}>{props.dateOfExpiry}</div>
                                </div>
                                <div className={styles.PassportNumber}>
                                    <div className={styles.Label}>Holder's signature</div>
                                    <div className={cn(styles.Field, styles.Signature)}>{props.signature}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.Mrz}>
                    <div className={styles.Mrl1}>{props.mrl1}</div>
                    <div className={styles.MrlDelimiter}></div>
                    <div className={styles.Mrl2}>{props.mrl2}</div>
                </div>
            </div>
        </div>
    )
}

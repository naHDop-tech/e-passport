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
    //
}

export function Passport(props: IPassportProps) {
    return (
        <div className={styles.Box}>
            <div className={styles.Passport}>
                <div className={styles.Uinfo}>
                    <div className={styles.Z1}>Digital documents Inc.</div>
                    <div className={styles.MainUInfo}>
                        <div className={styles.PhotoSide}>
                            <div className={styles.PhotoInfo}>Passport</div>
                            <div className={styles.PhotoZone}>
                                <img width = "165" height = "215" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT80lmS918O4AJ-A197bvSjLY9CTHZNmyi4AA&usqp=CAU" alt="Holder's photo"/>
                            </div>
                        </div>
                        <div className={styles.InfoSide}>
                            <div className={styles.InfoRow}>
                                <div className={styles.Type}>
                                    <div className={styles.Label}>Type</div>
                                    <div className={styles.Field}>P</div>
                                </div>
                                <div className={styles.Z4}>
                                    <div className={styles.Label}>Country code</div>
                                    <div className={styles.Field}>UTO</div>
                                </div>
                                <div className={styles.PassportNumber}>
                                    <div className={styles.Label}>Passport No</div>
                                    <div className={styles.Field}>L898902C3</div>
                                </div>
                            </div>
                            <div className={styles.InfoRow}>
                                <div className={styles.LongItemLeft}>
                                    <div className={styles.Label}>Surname</div>
                                    <div className={styles.Field}>ERIKSSON</div>
                                </div>
                            </div>
                            <div className={styles.InfoRow}>
                                <div className={styles.LongItemLeft}>
                                    <div className={styles.Label}>Name</div>
                                    <div className={styles.Field}>ANNA MARIA</div>
                                </div>
                            </div>
                            <div className={styles.InfoRow}>
                                <div className={styles.LongItemLeft}>
                                    <div className={styles.Label}>Nationality</div>
                                    <div className={styles.Field}>UTOPIAN</div>
                                </div>
                            </div>
                            <div className={styles.InfoRow}>
                                <div className={styles.DateOfBirth}>
                                    <div className={styles.Label}>Date of birth</div>
                                    <div className={styles.Field}>12 AUG 1974</div>
                                </div>
                                <div className={styles.PassportNumber}>
                                    <div className={styles.Label}>Personal number</div>
                                    <div className={styles.Field}>ZE184266B</div>
                                </div>
                            </div>
                            <div className={styles.InfoRow}>
                                <div className={styles.Sex}>
                                    <div className={styles.Label}>Sex</div>
                                    <div className={styles.Field}>F</div>
                                </div>
                                <div className={styles.LongItemRight}>
                                    <div className={styles.Label}>Place of birth</div>
                                    <div className={styles.Field}>ZENITH</div>
                                </div>
                            </div>
                            <div className={styles.InfoRow}>
                                <div className={styles.DateOfIssue}>
                                    <div className={styles.Label}>Date of issue</div>
                                    <div className={styles.Field}>16 APR 2022</div>
                                </div>
                                <div className={styles.PassportNumber}>
                                    <div className={styles.Label}>Authority</div>
                                    <div className={styles.Field}>PASSPORT OFFICE</div>
                                </div>
                            </div>
                            <div className={styles.LastInfoRow}>
                                <div className={styles.DateOfExpiry}>
                                    <div className={styles.Label}>Date of expiry</div>
                                    <div className={styles.Field}>16 APR 2032</div>
                                </div>
                                <div className={styles.PassportNumber}>
                                    <div className={styles.Label}>Holder's signature</div>
                                    <div className={cn(styles.Field, styles.Signature)}>Anna Maria Eriksson</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.Mrz}>
                    <div className={styles.Mrl1}>{'P<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<<<<<<<<<'}</div>
                    <div className={styles.MrlDelimiter}></div>
                    <div className={styles.Mrl2}>{'L898902C36<UTO7408122F1604229ZE184266B<<<<10'}</div>
                </div>
            </div>
        </div>
    )
}

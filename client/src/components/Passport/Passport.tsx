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
                            <div className={styles.PhotoZone}></div>
                        </div>
                        <div className={styles.InfoSide}>
                            <div className={styles.InfoRow}>
                                <div className={styles.Type}></div>
                                <div className={styles.Z4}></div>
                            </div>
                            <div className={styles.InfoRow}></div>
                            <div className={styles.InfoRow}></div>
                            <div className={styles.InfoRow}></div>
                            <div className={styles.InfoRow}>
                                <div className={styles.DateOfBirth}></div>
                            </div>
                            <div className={styles.InfoRow}>
                                <div className={styles.Sex}></div>
                            </div>
                            <div className={styles.InfoRow}>
                                <div className={styles.DateOfIssue}></div>
                            </div>
                            <div className={styles.LastInfoRow}>
                                <div className={styles.DateOfExpiry}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.Mrz}>
                    <div className={styles.Mrl1}>{'P<ARCGREY<<AMANDA<CAROLINE<<<<<<<<<<<<<<<<<<'}</div>
                    <div className={styles.MrlDelimiter}></div>
                    <div className={styles.Mrl2}>{'00000647<7ARC111114F140723700001190<<<<<<<78'}</div>
                </div>
            </div>
        </div>
    )
}

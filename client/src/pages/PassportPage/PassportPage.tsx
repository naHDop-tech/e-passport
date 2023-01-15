import { PassportDlc } from '@components/Passport'

import s from './PassportPage.module.css'
const styles = s as PassportPageStyle

interface PassportPageStyle {
    PageBox: string
}

export function PassportPage() {
    return (
        <div className={styles.PageBox}>
            <PassportDlc />
        </div>
    )
}

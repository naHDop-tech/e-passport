import s from './FooterStyle.module.css'
const styles = s as IFooterStyle

interface IFooterStyle {
  Box: string
  ContactBlock: string
  SiteMapBlock: string
  SocialMediaBlock: string
}

export interface IFooterProps {
  onNavigate: (data: string) => void
}

export function Footer(props: IFooterProps) {
  const { onNavigate } = props

  return (
    <div className={styles.Box}>
      <div className={styles.ContactBlock}>ContactBlock</div>
      <div className={styles.SiteMapBlock}>SiteMapBlock</div>
      <div className={styles.SocialMediaBlock}>SocialMediaBlock</div>
    </div>
  )
}

import s from './CustomerInfoStyle.module.css'
const styles = s as unknown as ICustomerHeaderStyle

interface ICustomerHeaderStyle {
  Box: string
}
export function CustomerInfo() {
  return (
    <div className={styles.Box}></div>
  )
}

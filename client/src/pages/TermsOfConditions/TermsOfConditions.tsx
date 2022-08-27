import s from './TermsOfServiceStyle.module.css'
const styles = s as ITermsOfServiceStyle

import cs from '@components/CommonStyle.module.css'
import { ICommonStyle } from '@components/common-style-types'

const commonStyle = cs as ICommonStyle

interface ITermsOfServiceStyle {
  Box: string
}

export function TermsOfConditions() {
  return (
    <div className={styles.Box}>
      <h1 className={commonStyle.ColorPrimary}>Terms of Service</h1>
      <p>By using this website, you agree to the terms set forth in this Terms of Service and in the Privacy Policy.</p>
      <div className={commonStyle.Margin32} />
      <h3>Terms</h3>
      <p>By accessing this Website, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this Website are protected by copyright and trade mark law.</p>
      <div className={commonStyle.Margin32} />
      <h3>Use</h3>
      <p>Permission is granted to download user generated content on this site for the purposes of fair use. This is not a transfer of title, and under the use of this site, you may not:</p>
      <div className={commonStyle.Margin24} />
      <p>attempt to reverse engineer any software contained on this Website;
perform any illegal activities;
submit, or upload any illegal materials;
submit or upload any profanity, hateful speech, nudity, bullying, or illicit content of any kind;
utilize user generated content for any illegal or malicious intent;
use this site to initiate any illegal actions or wrongdoing of any kind.
Breaking these rules or doing anything else that we deem unfit for use of this service will let us terminate upon violations of any of these restrictions.  We hold the right to block the access, remove the content, or delete the accounts, of anyone, for any reason whatsoever.  Upon termination, your viewing right will also be terminated and you should destroy any downloaded materials in your possession whether it is in physical or digital format. </p>
      <div className={commonStyle.Margin32} />
      <h3>Disclaimer</h3>
      <p>All the materials on this Website are provided “as is”. We make no warranties, may it be expressed or implied, and this therefore negates all other warranties. Furthermore, we do not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.</p>
      <div className={commonStyle.Margin32} />
      <h3>Limitations</h3>
      <p>We or our suppliers will not be held accountable for any damages that could or would arise with the use or inability to use the materials on this Website, even if this Website or an authorized representative of this Website has been notified, orally or written, of the possibility of such damage.  For no reason whatsoever can we be held responsible for any damages relating to or pertaining to the use of this Website.</p>
      <div className={commonStyle.Margin32} />
      <h3>Revisions and Errata</h3>
      <p>The materials appearing on this Website may include technical, typographical, or photographic errors. We will not promise that any of the materials in this Website are accurate, complete, or current. We may change the materials contained on this Website at any time without notice. We strive to provide the best content and information possible, do not make any commitment to update the materials and may never do so.</p>
      <div className={commonStyle.Margin32} />
      <h3>Links</h3>
      <p>We have not reviewed all of the sites linked to on this Website and are not responsible for the contents of any such linked site. The presence of any link does not imply endorsement by us of the site linked to. The use of any linked website is at the user’s own risk.</p>
      <div className={commonStyle.Margin32} />
      <h3>Governing Law</h3>
      <p>Any claim related to this Website shall be governed by the laws of United States without regards to its conflict of law provisions.</p>
      <div className={commonStyle.Margin32} />
      <h3>Site Terms of Use Modifications</h3>
      <p>The Terms of Service for this Website may be updated at any time without prior notice.  Updates to these terms will be posted to this page. By using this Website, you are agreeing to be bound by the current and future versions of these Terms and Conditions of Use.</p>
      <div className={commonStyle.Margin32} />
      <h3>Privacy Policy</h3>
      <p>By using this website you agree to the Terms of Service on this page, as well as, the the items specified in the Privacy Policy.</p>
    </div>
  )
}

import { gql } from '@apollo/client'

export const IS_DARK_THEME = gql`
  query getIsThemeDark {
    isDark @client
  }
`

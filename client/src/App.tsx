import Button from '@mui/material/Button';
import './style.css'

import { MainLayout } from './components/layouts/MainLayout'

export function App(): JSX.Element {
  return (
    <MainLayout>
      <h1>E-Passport</h1>
      <Button variant="contained">Push me</Button>
    </MainLayout>
  )
}

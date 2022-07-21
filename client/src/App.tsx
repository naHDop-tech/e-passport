import { Button } from './components/common/Buttons/Primary'

export function App(): JSX.Element {
  return (
    <div>
      <h1>E-Passport</h1>
      <Button onClick={() => console.log('button pushed')}>Push my</Button>
    </div>
  );
}

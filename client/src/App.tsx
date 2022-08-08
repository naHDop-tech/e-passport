import { BrowserRouter as RouterProvider, Routes, Route } from 'react-router-dom'
import './style.css'

import { Login } from './components/Login'
import { MainLayoutDlc } from './components/layouts/MainLayout'

export function App(): JSX.Element {
  return (
    <RouterProvider>
      <MainLayoutDlc>
        <Routes>
          <Route path='/' element={<>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam eligendi velit aliquid doloribus minima? Vero ut ipsam autem accusamus, alias ipsum excepturi, quibusdam voluptates voluptatum recusandae eveniet, hic distinctio repellendus!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam eligendi velit aliquid doloribus minima? Vero ut ipsam autem accusamus, alias ipsum excepturi, quibusdam voluptates voluptatum recusandae eveniet, hic distinctio repellendus!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam eligendi velit aliquid doloribus minima? Vero ut ipsam autem accusamus, alias ipsum excepturi, quibusdam voluptates voluptatum recusandae eveniet, hic distinctio repellendus!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam eligendi velit aliquid doloribus minima? Vero ut ipsam autem accusamus, alias ipsum excepturi, quibusdam voluptates voluptatum recusandae eveniet, hic distinctio repellendus!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam eligendi velit aliquid doloribus minima? Vero ut ipsam autem accusamus, alias ipsum excepturi, quibusdam voluptates voluptatum recusandae eveniet, hic distinctio repellendus!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam eligendi velit aliquid doloribus minima? Vero ut ipsam autem accusamus, alias ipsum excepturi, quibusdam voluptates voluptatum recusandae eveniet, hic distinctio repellendus!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam eligendi velit aliquid doloribus minima? Vero ut ipsam autem accusamus, alias ipsum excepturi, quibusdam voluptates voluptatum recusandae eveniet, hic distinctio repellendus!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam eligendi velit aliquid doloribus minima? Vero ut ipsam autem accusamus, alias ipsum excepturi, quibusdam voluptates voluptatum recusandae eveniet, hic distinctio repellendus!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam eligendi velit aliquid doloribus minima? Vero ut ipsam autem accusamus, alias ipsum excepturi, quibusdam voluptates voluptatum recusandae eveniet, hic distinctio repellendus!</p>
          </>}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
      </MainLayoutDlc>
    </RouterProvider>
  )
}

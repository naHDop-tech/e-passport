import { BrowserRouter as RouterProvider, Routes, Route } from 'react-router-dom'
import './style.css'

import { Login } from './components/Login'
import { MainLayoutGrid } from './components/layouts/MainLayout/MainLayoutGrid'
import { withUserInfo } from './components/HOC/WithUserInfo'

const MainLayoutWrapper = withUserInfo(MainLayoutGrid)

export function App(): JSX.Element {
  return (
    <RouterProvider>
      <MainLayoutWrapper>
        <Routes>
          <Route path='/' element={<>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, inventore. Quod rerum sit quaerat eligendi nisi autem possimus vero, eius, nobis praesentium provident iure dolore soluta ex libero tempora delectus a quisquam ullam odio. Cumque necessitatibus ipsa temporibus. Sequi, dolorum distinctio tempora culpa velit praesentium adipisci dolores aliquam nam doloremque.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, inventore. Quod rerum sit quaerat eligendi nisi autem possimus vero, eius, nobis praesentium provident iure dolore soluta ex libero tempora delectus a quisquam ullam odio. Cumque necessitatibus ipsa temporibus. Sequi, dolorum distinctio tempora culpa velit praesentium adipisci dolores aliquam nam doloremque.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, inventore. Quod rerum sit quaerat eligendi nisi autem possimus vero, eius, nobis praesentium provident iure dolore soluta ex libero tempora delectus a quisquam ullam odio. Cumque necessitatibus ipsa temporibus. Sequi, dolorum distinctio tempora culpa velit praesentium adipisci dolores aliquam nam doloremque.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, inventore. Quod rerum sit quaerat eligendi nisi autem possimus vero, eius, nobis praesentium provident iure dolore soluta ex libero tempora delectus a quisquam ullam odio. Cumque necessitatibus ipsa temporibus. Sequi, dolorum distinctio tempora culpa velit praesentium adipisci dolores aliquam nam doloremque.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, inventore. Quod rerum sit quaerat eligendi nisi autem possimus vero, eius, nobis praesentium provident iure dolore soluta ex libero tempora delectus a quisquam ullam odio. Cumque necessitatibus ipsa temporibus. Sequi, dolorum distinctio tempora culpa velit praesentium adipisci dolores aliquam nam doloremque.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, inventore. Quod rerum sit quaerat eligendi nisi autem possimus vero, eius, nobis praesentium provident iure dolore soluta ex libero tempora delectus a quisquam ullam odio. Cumque necessitatibus ipsa temporibus. Sequi, dolorum distinctio tempora culpa velit praesentium adipisci dolores aliquam nam doloremque.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, inventore. Quod rerum sit quaerat eligendi nisi autem possimus vero, eius, nobis praesentium provident iure dolore soluta ex libero tempora delectus a quisquam ullam odio. Cumque necessitatibus ipsa temporibus. Sequi, dolorum distinctio tempora culpa velit praesentium adipisci dolores aliquam nam doloremque.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, inventore. Quod rerum sit quaerat eligendi nisi autem possimus vero, eius, nobis praesentium provident iure dolore soluta ex libero tempora delectus a quisquam ullam odio. Cumque necessitatibus ipsa temporibus. Sequi, dolorum distinctio tempora culpa velit praesentium adipisci dolores aliquam nam doloremque.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, inventore. Quod rerum sit quaerat eligendi nisi autem possimus vero, eius, nobis praesentium provident iure dolore soluta ex libero tempora delectus a quisquam ullam odio. Cumque necessitatibus ipsa temporibus. Sequi, dolorum distinctio tempora culpa velit praesentium adipisci dolores aliquam nam doloremque.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, inventore. Quod rerum sit quaerat eligendi nisi autem possimus vero, eius, nobis praesentium provident iure dolore soluta ex libero tempora delectus a quisquam ullam odio. Cumque necessitatibus ipsa temporibus. Sequi, dolorum distinctio tempora culpa velit praesentium adipisci dolores aliquam nam doloremque.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, inventore. Quod rerum sit quaerat eligendi nisi autem possimus vero, eius, nobis praesentium provident iure dolore soluta ex libero tempora delectus a quisquam ullam odio. Cumque necessitatibus ipsa temporibus. Sequi, dolorum distinctio tempora culpa velit praesentium adipisci dolores aliquam nam doloremque.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, inventore. Quod rerum sit quaerat eligendi nisi autem possimus vero, eius, nobis praesentium provident iure dolore soluta ex libero tempora delectus a quisquam ullam odio. Cumque necessitatibus ipsa temporibus. Sequi, dolorum distinctio tempora culpa velit praesentium adipisci dolores aliquam nam doloremque.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, inventore. Quod rerum sit quaerat eligendi nisi autem possimus vero, eius, nobis praesentium provident iure dolore soluta ex libero tempora delectus a quisquam ullam odio. Cumque necessitatibus ipsa temporibus. Sequi, dolorum distinctio tempora culpa velit praesentium adipisci dolores aliquam nam doloremque.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, inventore. Quod rerum sit quaerat eligendi nisi autem possimus vero, eius, nobis praesentium provident iure dolore soluta ex libero tempora delectus a quisquam ullam odio. Cumque necessitatibus ipsa temporibus. Sequi, dolorum distinctio tempora culpa velit praesentium adipisci dolores aliquam nam doloremque.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, inventore. Quod rerum sit quaerat eligendi nisi autem possimus vero, eius, nobis praesentium provident iure dolore soluta ex libero tempora delectus a quisquam ullam odio. Cumque necessitatibus ipsa temporibus. Sequi, dolorum distinctio tempora culpa velit praesentium adipisci dolores aliquam nam doloremque.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, inventore. Quod rerum sit quaerat eligendi nisi autem possimus vero, eius, nobis praesentium provident iure dolore soluta ex libero tempora delectus a quisquam ullam odio. Cumque necessitatibus ipsa temporibus. Sequi, dolorum distinctio tempora culpa velit praesentium adipisci dolores aliquam nam doloremque.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, inventore. Quod rerum sit quaerat eligendi nisi autem possimus vero, eius, nobis praesentium provident iure dolore soluta ex libero tempora delectus a quisquam ullam odio. Cumque necessitatibus ipsa temporibus. Sequi, dolorum distinctio tempora culpa velit praesentium adipisci dolores aliquam nam doloremque.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, inventore. Quod rerum sit quaerat eligendi nisi autem possimus vero, eius, nobis praesentium provident iure dolore soluta ex libero tempora delectus a quisquam ullam odio. Cumque necessitatibus ipsa temporibus. Sequi, dolorum distinctio tempora culpa velit praesentium adipisci dolores aliquam nam doloremque.</p>
          </>}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
      </MainLayoutWrapper>
    </RouterProvider>
  )
}

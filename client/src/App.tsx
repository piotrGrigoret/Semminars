import './App.scss'
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { NotFound } from './pages/NotFound';
import { Tables } from './pages/Tables';
  function App() {

  return (
    <Routes>
      <Route path='/' element={<MainLayout/>}>
        <Route path='/' element={<Tables/>}></Route>
        <Route path='/*' element={<NotFound/>}></Route>
      </Route>  
    </Routes>
  )
}

export default App

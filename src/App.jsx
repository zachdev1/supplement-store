import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import { Home } from './pages/home/Home'
import { Login } from './pages/login/Login'
import { Register } from './pages/register/Register'
import { Layout } from './Layout'
import { Footer } from './components/Footer'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
        </Route>
      </Routes>
    </Router>

    <Footer />
  </>
  );
}

export default App;

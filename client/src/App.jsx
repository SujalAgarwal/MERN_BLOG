import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./Pages/Home"
import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"
import About from "./Pages/About"
import Dashboard from "./Pages/Dashboard"
import Projects from "./Pages/Projects"
function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/sign-in' element={<SignIn/>}></Route>
        <Route path='/sign-up' element={<SignUp/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/projects' element={<Projects/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./Pages/Home"
import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"
import About from "./Pages/About"
import Dashboard from "./Pages/Dashboard"
import Projects from "./Pages/Projects"
import Headers from "./Components/Headers"
import FooterComp from "./Components/FooterComp"
import PrivateRoute from "./Components/PrivateRoute"
function App() {
  return (
    <BrowserRouter>
      <Headers />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route element={<PrivateRoute/>}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/projects" element={<Projects />}></Route>
      </Routes>
      <FooterComp />
    </BrowserRouter>
  );
}

export default App
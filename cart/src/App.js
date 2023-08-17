import "./App.css";
import {BrowserRouter ,Routes ,Route} from "react-router-dom"
import Home from "./Home";
import Firebase from "./Firebase";
import Buy from "./Buy";
import Header from "./Header";

function App() {
  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={ <Home /> }></Route>
          <Route path='/buy/:id' element={ <Buy /> }></Route>
          <Route path='/orders' element={ <Firebase /> }></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

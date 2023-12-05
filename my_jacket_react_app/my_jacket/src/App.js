import './App.css';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './components/HomePage';
import {Route, Routes} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route element = {<HomePage/>} path=''></Route>
        <Route element = {<Cart/>} path='/cart'></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;

import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Provider } from 'react-redux';

import { store } from './state';

import './App.css';
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Test from './pages/Test';


function App() {
    return (
      <Provider store={store}>
        <div className="App">
            <BrowserRouter>
              <Nav />
              <main className="form-signin">
                <Routes>
                  {/* <Route path="/" element={<Test />} />  */}
                  <Route path="/" element={<Home/>} />
                  <Route path="/login" element={<Login />}/>
                  <Route path="/register" element={<Register />}/>
                </Routes>
              </main>
          </BrowserRouter>
        </div>
      </Provider>
    );
}

export default App;

import { Routes, Route } from "react-router-dom";
import './App.css';
import 'aos/dist/aos.css'
import Home from './pages/home';
import Header from "./components/header";
// import Footer from "./components/footer";
// import Contact from "./pages/contact";
// import About from "./pages/about";
import Login from "./pages/login";
// import Register from "./pages/register";
// import CatProd from "./pages/catProd";
// import Product from "./pages/product";
// import ForgetPass from "./pages/forgetPass";
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" />
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Search from "./pages/search";
// import Error from "./pages/error";
// import Unauthorized from "./pages/unauthorized";
import { useState, useEffect } from "react";
import { loginContext } from "./context/context";

function App() {
  
  const [login, setLogin] = useState(false);
  
  // useEffect(()=>{
  //   if(localStorage.getItem('authToken') == null){
  //     window.location.href = `${import.meta.env.VITE_BASE_URL}/login`;
  //   }
  // }, [])

  return (
    <div className="bg-main">
      <loginContext.Provider value={{login, setLogin}} >
      <ToastContainer />
    <Header />
    <Routes>
        <Route index element={<Home />} />
        {/* <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} /> */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} />
        <Route path="/forgetpass" element={<ForgetPass />} />
        <Route path="/cat/:name" element={<CatProd />} />
        <Route path="/prod/:id" element={<Product />} />
        <Route path="/search/:value" element={<Search />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Error />} />
        <Route path="/unauthorized" element={<Unauthorized />} /> */}
    </Routes>
  {/* <Footer /> */}
  </loginContext.Provider>
  </div>
)
}

export default App

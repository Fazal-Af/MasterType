import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Counter from "./component/Counter";
import Home from "./component/Home";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/typingSpeed" element={<Counter />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

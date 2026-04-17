import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/shared/Header"
import Footer from "./components/shared/Footer"

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;

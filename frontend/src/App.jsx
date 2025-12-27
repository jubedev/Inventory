import { Outlet } from "react-router-dom";
import Header from "./components/shared/Header"
import Footer from "./components/shared/Footer"

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;

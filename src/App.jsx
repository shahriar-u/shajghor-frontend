import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

function App() {
  return <>
    {/* menu/ */}
    <div>
      <Navbar />
    </div>
    {/* outlie  */}
    <div>
        <Outlet />
    </div>
    {/* footer */}
    <div>
    <Footer />
    </div>
  </>;
}

export default App;

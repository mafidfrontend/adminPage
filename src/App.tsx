import "./App.css";
import Navbar from "./companents/Navbar";
import LoginPage from "./companents/Login";
import useMyStor from "./useMyStore";

function App() {
const stateTokin = useMyStor()
  return (
    <>
      {stateTokin.accessToken ? <Navbar /> : <LoginPage />}
    </>
  );
}

export default App;

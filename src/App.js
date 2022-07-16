import "./App.css";
import { useStateValue } from "./components/Contextapi/StateProvider";
import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";
import Sidebar from "./components/SideBar/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const [{ user }] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <BrowserRouter>
            <Sidebar />
            <Routes>
              <Route path="/" element={<Chat />} />
              <Route path="/rooms/:roomId" element={<Chat />} />
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}

export default App;

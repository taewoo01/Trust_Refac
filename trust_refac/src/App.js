import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from './Layout/Nav/Nav';
import Main from "./pages/Main/Main";
import Right from "./Layout/Right/Right";
import Sign from "./pages/Sign/Sign/sign";
import Modal from "./components/Modal/model"
import './App.css';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <>  
      <BrowserRouter>
        <Nav openLoginModal={openLoginModal} />
        <div className="app-layout">
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Main />} />
            </Routes>
            {isLoginModalOpen && (
              <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
                <Sign />
              </Modal>
            )}
          </div>
          <Right />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;

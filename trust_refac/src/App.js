// App.js
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { fetchProducts } from "./firebase/db"; // Firestore 유틸리티
import { fetchUsers } from "./firebase/db"; // 사용자 정보 가져오기
import Nav from "./Layout/Nav/Nav";
import Main from "./pages/Main/Main";
import Product from "./pages/Product/Product";
import InfoUpdate from "./pages/Mypage/InfoUpdate/InfoUpdate";
import MyShop from "./pages/Mypage/MyShop/MyShop";
import PwUpdate from "./pages/Mypage/PwUpdate/PwUpdate";
import DetailProduct from "./pages/DetailProduct/DetailProduct";
import Right from "./Layout/Right/Right";
import Modal from "./components/Modal/Modal";
import "./App.css";
import Sign from "./pages/Sign/Sign/Sign";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [productsList, setProductList] = useState([]);
  const [usersList, setUsersList] = useState([]); // 사용자 정보 상태 추가

  // Firebase 데이터 가져오기
  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchProducts();
      setProductList(products);
    };
    loadProducts();

    const loadUsers = async () => {
      const users = await fetchUsers();
      setUsersList(users); // 사용자 데이터 설정
    };
    loadUsers();
  }, []);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const [viewedItems, setViewedItems] = useState([]);

  const handleProductClick = (item) => {
    setViewedItems((prevItems) => {
      const updatedItems = prevItems.filter((viewed) => viewed.id !== item.id);
      return [item, ...updatedItems].slice(0, 4);
    });
  };

  return (
    <BrowserRouter>
      <Nav openLoginModal={openLoginModal} />
      <div className="app-layout">
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  products={productsList}
                  onProductClick={handleProductClick}
                />
              }
            />
            <Route path="/product" element={<Product />} />
            <Route path="/infoupdate" element={<InfoUpdate />} />
            <Route
              path="/mypage"
              element={<MyShop products={productsList} />}
            />
            <Route path="/pwupdate" element={<PwUpdate />} />
            <Route
              path="/detailproduct/:id"
              element={<DetailProduct products={productsList} />}
            />
          </Routes>
          {isLoginModalOpen && (
            <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
              <Sign users={usersList} />
            </Modal>
          )}
        </div>
        <LocationBasedRightMenu viewedItems={viewedItems} />
      </div>
    </BrowserRouter>
  );
}

function LocationBasedRightMenu({ viewedItems }) {
  const location = useLocation();
  const showRightMenu =
    location.pathname === "/" ||
    location.pathname.startsWith("/detailproduct") ||
    location.pathname.startsWith("/mypage");

  return showRightMenu ? <Right viewedItems={viewedItems} /> : null;
}

export default App;

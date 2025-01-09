import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { fetchProducts } from "./firebase/db"; // Firestore 유틸리티
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

  // Firebase 데이터 가져오기
  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchProducts();
      setProductList(products);
    };
    loadProducts();
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
              <Sign />
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

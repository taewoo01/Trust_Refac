import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from './Layout/Nav/Nav';
import Main from "./pages/Main/Main";
import Product from "./pages/Product/Product.jsx";
import InfoUpdate from "./pages/Mypage/InfoUpdate/InfoUpdate.jsx";
import MyShop from "./pages/Mypage/MyShop/MyShop.jsx";
import PwUpdate from "./pages/Mypage/PwUpdate/PwUpdate.jsx";
import DetailProduct from "./pages/DetailProduct/DetailProduct.jsx";
import Right from "./Layout/Right/Right";
import Sign from "./pages/Sign/Sign/Sign";
import Modal from "./components/Modal/Modal.jsx"
import './App.css';

/* 상위 컴포넌트에서 데이터 전달 */
const ProductCardItem = [
  {
      id: 1,
      imgsrc: "watch.png",
      product_title: "명품 시계",
      product_price: "100000원",
      product_des: "정말 깔끔하고 멋있는",
      product_view: "100",
      product_day: "2024-07-07",
      seller: "이영",
  },
  {
      id: 2,
      imgsrc: "watch.png",
      product_title: "명품 시계",
      product_price: "100000원",
      product_des: "정말 깔끔하고 멋있는",
      product_view: "47",
      product_day: "2024-07-08",
      seller: "이영",
  },
  {
      id: 3,
      imgsrc: "sheos.png",
      product_title: "나이키 신발",
      product_price: "50000원",
      product_des: "정말 깔끔하고 멋있는",
      product_view: "103",
      product_day: "2024-06-07",
      seller: "양세한",
  },
  {
      id: 4,
      imgsrc: "watch.png",
      product_title: "명품 시계",
      product_price: "100000원",
      product_des: "정말 깔끔하고 멋있는",
      product_view: "100",
      product_day: "2024-08-07",
      seller: "이영",
  },
  {
      id: 5,
      imgsrc: "watch.png",
      product_title: "명품 시계",
      product_price: "100000원",
      product_des: "정말 깔끔하고 멋있는",
      product_view: "100",
      product_day: "2024-02-07",
      seller: "이영",
  },
  {
      id: 6,
      imgsrc: "watch.png",
      product_title: "명품 시계",
      product_price: "100000원",
      product_des: "정말 깔끔하고 멋있는",
      product_view: "100",
      product_day: "2023-07-07",
      seller: "이영",
  },
  {
      id: 7,
      imgsrc: "watch.png",
      product_title: "명품 시계",
      product_price: "100000원",
      product_des: "정말 깔끔하고 멋있는",
      product_view: "100",
      product_day: "2024-07-29",
      seller: "이영",
  },
  {
      id: 8,
      imgsrc: "watch.png",
      product_title: "명품 시계",
      product_price: "100000원",
      product_des: "정말 깔끔하고 멋있는",
      product_view: "150",
      product_day: "2024-04-13",
      seller: "이영",
  },
  {
      id: 9,
      imgsrc: "watch.png",
      product_title: "명품 시계",
      product_price: "100000원",
      product_des: "정말 깔끔하고 멋있는",
      product_view: "100",
      product_day: "2024-07-04",
      seller: "이영",
  },
  {
      id: 10,
      imgsrc: "watch.png",
      product_title: "명품 시계",
      product_price: "100000원",
      product_des: "정말 깔끔하고 멋있는",
      product_view: "220",
      product_day: "2024-07-21",
      seller: "이영",
  },
]

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
              <Route path="/" element={<Main ProductCardItem={ProductCardItem}/>} />
              <Route path="/product" element={<Product />} />
              <Route path="/infoupdate" element={<InfoUpdate />} />
              <Route path="/mypage" element={<MyShop />} />
              <Route path="/pwupdate" element={<PwUpdate />} />
              <Route path="/detailproduct/:id" element={<DetailProduct ProductCardItem={ProductCardItem} />} />
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

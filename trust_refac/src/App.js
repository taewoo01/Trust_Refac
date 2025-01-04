import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Nav from "./Layout/Nav/Nav";
import Main from "./pages/Main/Main";
import Product from "./pages/Product/Product.jsx";
import InfoUpdate from "./pages/Mypage/InfoUpdate/InfoUpdate.jsx";
import MyShop from "./pages/Mypage/MyShop/MyShop.jsx";
import PwUpdate from "./pages/Mypage/PwUpdate/PwUpdate.jsx";
import DetailProduct from "./pages/DetailProduct/DetailProduct.jsx";
import Right from "./Layout/Right/Right";
import Sign from "./pages/Sign/Sign/Sign.jsx";
import Modal from "./components/Modal/Modal.jsx";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const myInfo = {
  id: 1,
  user_map: "진주시",
  user_name: "김태우",
  user_mail: "xodn9402",
  user_pw: "rlaxodn9402@",
  user_phone: "010806107002",
};

/* 상위 컴포넌트에서 데이터 전달 */
const ProductCardItem = [
  {
    id: 1,
    highcategory: "악세사리",
    category: "시계",
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
    highcategory: "가전제품",
    category: "기타",
    imgsrc: "tab.png",
    product_title: "태블릿",
    product_price: "200000원",
    product_des: "정말 깔끔하고 멋있는",
    product_view: "474",
    product_day: "2024-07-08",
    seller: "김유진",
  },
  {
    id: 3,
    highcategory: "패션",
    category: "신발",
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
    highcategory: "패션",
    category: "상의",
    imgsrc: "cloth.png",
    product_title: "깔끔한 티셔츠",
    product_price: "10000원",
    product_des: "정말 깔끔하고 멋있는",
    product_view: "180",
    product_day: "2023-08-07",
    seller: "이승규",
  },
  {
    id: 5,
    highcategory: "악세사리",
    category: "시계",
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
    highcategory: "가전제품",
    category: "기타",
    imgsrc: "tab.png",
    product_title: "태블릿",
    product_price: "200000원",
    product_des: "정말 깔끔하고 멋있는",
    product_view: "44",
    product_day: "2024-07-24",
    seller: "김유진",
  },
  {
    id: 7,
    highcategory: "악세사리",
    category: "시계",
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
    highcategory: "패션",
    category: "상의",
    imgsrc: "cloth.png",
    product_title: "깔끔한 티셔츠",
    product_price: "10000원",
    product_des: "정말 깔끔하고 멋있는",
    product_view: "106",
    product_day: "2024-10-07",
    seller: "이승규",
  },
  {
    id: 9,
    highcategory: "패션",
    category: "신발",
    imgsrc: "sheos.png",
    product_title: "나이키 신발",
    product_price: "50000원",
    product_des: "정말 깔끔하고 멋있는",
    product_view: "110",
    product_day: "2024-09-07",
    seller: "양세한",
  },
  {
    id: 10,
    highcategory: "악세사리",
    category: "시계",
    imgsrc: "watch.png",
    product_title: "명품 시계",
    product_price: "100000원",
    product_des: "정말 깔끔하고 멋있는",
    product_view: "220",
    product_day: "2024-07-21",
    seller: "이영",
  },
];

/* firebase */
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1EdVf3gcx58g2HVFj1QvsVe50cmVGcCk",
  authDomain: "trust-8c33d.firebaseapp.com",
  projectId: "trust-8c33d",
  storageBucket: "trust-8c33d.firebasestorage.app",
  messagingSenderId: "607876469365",
  appId: "1:607876469365:web:e4f356b663cf973c05de3c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [productsList, setProductList] = useState([]);
  useEffect(() => {
    const getProduct = async () => {
      let products = await getDocs(collection(db, "product"));
      let productListData = products.docs.map((product) => product.data());
      setProductList(productListData);
      console.log(productsList);
    };
    getProduct();
  }, []);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  {
    /* 최근 본 상품 관리 */
  }
  const [viewedItems, setViewedItems] = useState([]); // 최근 본 상품 저장

  const handleProductClick = (item) => {
    setViewedItems((prevItems) => {
      // 기존에 해당 상품이 이미 있으면 제거
      const updatedItems = prevItems.filter((viewed) => viewed.id !== item.id);

      // 새로운 항목을 맨 앞에 추가
      return [item, ...updatedItems].slice(0, 4); // 최대 4개의 항목만 저장
    });
  };

  return (
    <BrowserRouter>
      {/* 위치를 BrowserRouter 내부로 이동 */}
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
              element={<MyShop ProductCardItem={ProductCardItem} />}
            />
            <Route path="/pwupdate" element={<PwUpdate />} />
            <Route
              path="/detailproduct/:id"
              element={<DetailProduct ProductCardItem={ProductCardItem} />}
            />
          </Routes>
          {isLoginModalOpen && (
            <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
              <Sign />
            </Modal>
          )}
        </div>
        {/* useLocation 훅 사용 위치 변경 */}
        <LocationBasedRightMenu viewedItems={viewedItems} />
      </div>
    </BrowserRouter>
  );
}

// `useLocation`을 사용하는 컴포넌트 분리
function LocationBasedRightMenu({ viewedItems }) {
  const location = useLocation();
  const showRightMenu =
    location.pathname === "/" ||
    location.pathname.startsWith("/detailproduct") ||
    location.pathname.startsWith("/mypage");

  return showRightMenu ? <Right viewedItems={viewedItems} /> : null;
}

export default App;

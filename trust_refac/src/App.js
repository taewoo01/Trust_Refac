import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { fetchProducts, fetchUsers } from "./firebase/db"; // Firestore 유틸리티
import { auth } from "./firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
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
  const [user, setUser] = useState(null); // 로그인된 사용자 정보 관리
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [productsList, setProductList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [viewedItems, setViewedItems] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  // Firebase 인증 상태 감지
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // 로그인된 사용자 정보 저장
      setLoading(false); // 로딩 완료
    });
    return () => unsubscribe(); // 언마운트 시 구독 해제
  }, []);

  // Firebase 데이터 가져오기
  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchProducts();
      setProductList(products);
    };
    loadProducts();

    const loadUsers = async () => {
      const users = await fetchUsers();
      setUsersList(users);
    };
    loadUsers();
  }, []);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  // Firebase 로그아웃
  const logout = async () => {
    try {
      await signOut(auth); // Firebase 로그아웃
      setUser(null);
      console.log("로그아웃 성공");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  const handleLoginSuccess = (user) => {
    console.log("로그인 성공:", user);
    setUser(user);
  };

  const handleProductClick = (item) => {
    setViewedItems((prevItems) => {
      const updatedItems = prevItems.filter((viewed) => viewed.id !== item.id);
      return [item, ...updatedItems].slice(0, 4);
    });
  };

  if (loading) {
    return <div>로딩 중...</div>; // 인증 상태 확인 중일 때 로딩 화면 표시
  }

  return (
    <BrowserRouter>
      <Nav openLoginModal={openLoginModal} user={user} logout={logout} />
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
            <Route path="/pwupdate" element={<PwUpdate user={user} />} />
            {/* user 전달 */}
            <Route
              path="/detailproduct/:id"
              element={<DetailProduct products={productsList} />}
            />
          </Routes>
          {isLoginModalOpen && (
            <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
              <Sign
                users={usersList}
                onClose={closeLoginModal}
                onLoginSuccess={handleLoginSuccess}
              />
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

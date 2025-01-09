import React, { useState } from "react";
import "./MyShop.css";
import ProductCard from "../../../components/Card/Productcard/Productcard";

const MyShop = ({ Products }) => {
  const [selectedMenu, setSelectedMenu] = useState("buy"); // 기본값: 구매내역

  // 메뉴 클릭 핸들러
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  // 메뉴별 필터링된 데이터
  const filteredItems = Products.filter((item) => {
    if (selectedMenu === "buy") {
      return item.seller === "이영"; // 예: 구매내역 기준
    } else if (selectedMenu === "sell") {
      return item.seller !== "이영"; // 예: 판매내역 기준
    } else if (selectedMenu === "transactions") {
      return true; // 거래목록은 전체 데이터
    }
    return false;
  });

  return (
    <>
      <div className="my-shop-header">
        <h1>내 상점</h1>
      </div>
      <div className="my-shop-page">
        <div className="menu-container">
          {/* 구매내역 버튼 */}
          <div
            className={`menu-item ${selectedMenu === "buy" ? "active" : ""}`}
            onClick={() => handleMenuClick("buy")}
          >
            구매 희망
          </div>
          {/* 판매내역 버튼 */}
          <div
            className={`menu-item ${selectedMenu === "sell" ? "active" : ""}`}
            onClick={() => handleMenuClick("sell")}
          >
            등록한 물건
          </div>
          {/* 거래목록 버튼 */}
          <div
            className={`menu-item ${
              selectedMenu === "transactions" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("transactions")}
          >
            조회 목록
          </div>
        </div>
        {/* 필터링된 상품 카드 렌더링 */}
        <div className="product-list">
          {filteredItems.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyShop;

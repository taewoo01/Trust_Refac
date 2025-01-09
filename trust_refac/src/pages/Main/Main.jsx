import ProductCard from "../../components/Card/Productcard/Productcard";
import "./Main.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Main = ({ products, onProductClick }) => {
  // 최다 조회수 기준으로 정렬하여 상위 3개를 가져옵니다.
  const topViews = products
    .sort((a, b) => b.product_view - a.product_view) // 조회수 기준 내림차순 정렬
    .slice(0, 3); // 상위 3개 항목만 가져오기

  //페이지 관련
  const itemsPerPage = 20; // 페이지당 최대 20개 상품
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 관리

  // 페이지에 맞는 상품을 가져옵니다.
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = products.slice(startIndex, endIndex);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // 페이지 변경 함수
  const goToPage = (page) => {
    if (page < 1) page = 1; // 최소 페이지는 1
    if (page > totalPages) page = totalPages; // 최대 페이지는 총 페이지 수
    setCurrentPage(page);
  };

  return (
    <>
      <div className="mainpage">
        <div className="maxView">
          <div className="maxViewTitle">최다 조회수</div>
          <div className="productCardList">
            {topViews.map((item, index) => (
              <Link
                to={`/detailproduct/${item.id}`}
                key={`index-${index}`}
                onClick={() => onProductClick(item)}
              >
                <ProductCard item={item} key={`card-${index}`} />
              </Link>
            ))}
          </div>
        </div>
        <div className="lately">
          <div className="latelyTitle">최근 상품</div>
          <div className="productCardList">
            {products
              .sort((a, b) => new Date(b.product_day) - new Date(a.product_day)) // 날짜 기준 내림차순 정렬
              .map((item, index) => (
                <Link
                  to={`/detailproduct/${item.id}`}
                  key={`index-${index}`}
                  onClick={() => onProductClick(item)}
                >
                  <ProductCard item={item} key={`card-${index}`} />
                </Link>
              ))}
          </div>
        </div>
        {/* 페이지네이션 버튼 */}
        <div className="pagination">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1} // 첫 번째 페이지에서 이전 버튼 비활성화
          >
            이전
          </button>
          <span>{`${currentPage} / ${totalPages}`}</span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages} // 마지막 페이지에서 다음 버튼 비활성화
          >
            다음
          </button>
        </div>
      </div>
    </>
  );
};

export default Main;

import { useEffect, useState } from "react";
import LatelyCard from "../../components/Card/LatelyCard/LatelyCard";
import "./Right.css";

const Right = ({ viewedItems }) => {
  const [displayedItems, setDisplayedItems] = useState([]);

  useEffect(() => {
    // 최대 3개의 최근 본 상품만 표시하도록 상태 업데이트
    const updatedItems = viewedItems.slice(0, 3);
    setDisplayedItems(updatedItems);
  }, [viewedItems]);

  return (
    <div className="right-menu">
      <div className="right-menu-a">
        <div className="lately-b">최근 본 상품</div>
        <div className="lately-list">
          {displayedItems.length === 0 ? (
            <div className="empty-message">최근 본 상품이 없습니다</div>
          ) : (
            displayedItems.map((item) => (
              <LatelyCard key={item.id} item={item} />
            ))
          )}
        </div>
        <div className="top-button">
          <button className="button">TOP</button>
        </div>
      </div>
    </div>
  );
};

export default Right;

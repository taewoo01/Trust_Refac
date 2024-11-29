import ProductCard from "../../components/Card/DetailProduct/Productcard";
import "./Main.css"
import { Link  } from "react-router-dom";

const Main = ({ ProductCardItem }) => {
    // 최다 조회수 기준으로 정렬하여 상위 3개를 가져옵니다.
    const topViews = ProductCardItem
        .sort((a, b) => b.product_view - a.product_view)  // 조회수 기준 내림차순 정렬
        .slice(0, 3);  // 상위 3개 항목만 가져오기

    return (
        <>
        <div className="mainpage">
            <div className="maxView">
                <div className="maxViewTitle">
                    최다 조회수
                </div>
                <div className="productCardList">
                    {topViews.map((item) => (
                        <Link to={`/detailproduct/${item.id}`} key={item.id}>
                            <ProductCard item={item} />
                        </Link>
                    ))}
                </div>
            </div>
            <div className="lately">
                <div className="latelyTitle">
                    최근 상품
                </div>
                <div className="productCardList">
                    {ProductCardItem
                        .sort((a, b) => new Date(b.product_day) - new Date(a.product_day))  // 날짜 기준 내림차순 정렬
                        .map((item) => (
                            <Link to={`/detailproduct/${item.id}`} key={item.id}>
                                <ProductCard item={item} />
                            </Link>
                        ))}
                </div>
            </div>
        </div>
        </>
    );
};

export default Main;


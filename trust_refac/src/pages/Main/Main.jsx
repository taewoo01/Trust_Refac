import ProductCard from "../../components/Card/productcard";
import "../../assets/styles/Main.css"

const ProductCardItem = [
    {
        id: 1,
        imgsrc: "../../assets/images/watch.png",
        product_title: "명품 시계",
        product_price: "100000원",
        product_view: "100",
        product_day: "2024-07-07",
        name: "이영",
    },
    {
        id: 2,
        imgsrc: "../../assets/images/watch.png",
        product_title: "명품 시계",
        product_price: "100000원",
        product_view: "47",
        product_day: "2024-07-08",
        name: "이영",
    },
    {
        id: 3,
        imgsrc: "/products/sheos.png",
        product_title: "나이키 신발",
        product_price: "50000원",
        product_view: "103",
        product_day: "2024-06-07",
        name: "양세한",
    },
    {
        id: 4,
        imgsrc: "../../assets/images/watch.png",
        product_title: "명품 시계",
        product_price: "100000원",
        product_view: "100",
        product_day: "2024-08-07",
        name: "이영",
    },
    {
        id: 5,
        imgsrc: "../../assets/images/watch.png",
        product_title: "명품 시계",
        product_price: "100000원",
        product_view: "100",
        product_day: "2024-02-07",
        name: "이영",
    },
    {
        id: 6,
        imgsrc: "../../assets/images/watch.png",
        product_title: "명품 시계",
        product_price: "100000원",
        product_view: "100",
        product_day: "2023-07-07",
        name: "이영",
    },
    {
        id: 7,
        imgsrc: "../../assets/images/watch.png",
        product_title: "명품 시계",
        product_price: "100000원",
        product_view: "100",
        product_day: "2024-07-29",
        name: "이영",
    },
    {
        id: 8,
        imgsrc: "../../assets/images/watch.png",
        product_title: "명품 시계",
        product_price: "100000원",
        product_view: "150",
        product_day: "2024-04-13",
        name: "이영",
    },
    {
        id: 9,
        imgsrc: "../../assets/images/watch.png",
        product_title: "명품 시계",
        product_price: "100000원",
        product_view: "100",
        product_day: "2024-07-04",
        name: "이영",
    },
    {
        id: 10,
        imgsrc: "../../assets/images/watch.png",
        product_title: "명품 시계",
        product_price: "100000원",
        product_view: "100",
        product_day: "2024-07-21",
        name: "이영",
    },
]

const Main = () => {
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
                        <ProductCard key={item.id} item={item} />
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
                            <ProductCard key={item.id} item={item} />
                        ))}
                </div>
            </div>
        </div>
        </>
    );
};

export default Main;


import { useParams } from "react-router-dom";
import "./DetailProduct.css";
import DetailProductCard from "../../components/Card/DetailProductCard/DetailProductCard";
import Comnet from "../../components/Common/Coment/Coment";

const DetailProduct = ({ ProductCardItem }) => {
    const { id } = useParams(); // URL에서 id 값을 가져옵니다.

    // 해당 id에 맞는 상품 찾기
    const product = ProductCardItem.find(item => item.id === parseInt(id)); // id는 숫자로 비교

    return (
        <>
            <div className="detailProductPage">
                <div className="detailproduct">
                {product ? (
                    <DetailProductCard item={product} />
                ) : (
                    <p>상품을 찾을 수 없습니다.</p>
                )}
                </div>
                <div className="comentpage">
                    <Comnet />
                </div>
            </div>
        </>
    );
};

export default DetailProduct;

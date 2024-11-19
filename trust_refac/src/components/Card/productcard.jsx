import "../../assets/styles/productcard.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";


const ProductCard = ({item}) => {
    return (
        <> 
            <div className="productCard">
                <div className="productImg">
                    <img className="product-img" src={item.imgSrc} alt={item.title} />
                </div>
                <div className="productTitle">
                    {item.product_title}
                </div>
                <div className="productPrice">
                    {item.product_price}
                </div>
                <div className="info">
                    <div className="productView">
                        <FontAwesomeIcon
                        className="View_icon"
                        icon={faEye}
                        />
                        {item.product_view}
                    </div>
                    <div className="date">
                        <div className="productDay">
                            {item.product_day}
                        </div>
                        <div className="name">
                            {item.name}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCard;
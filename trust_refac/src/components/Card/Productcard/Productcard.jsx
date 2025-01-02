import "./Productcard.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";


const ProductCard = ({item}) => {

    const imgsrc = require(`../../../assets/images/${item.imgsrc}`);

    return (
        <> 
            <div className="productCard">
                <div className="productImg">
                    <img className="product-img" src={imgsrc} alt={item.title} />
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
                        <div className="seller">
                            {item.seller}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCard;
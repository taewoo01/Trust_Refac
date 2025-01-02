import { Link } from "react-router-dom";
import "./LatelyCard.css";

const LatelyCard = ({ item }) => {
  return (
    <div className="lately-card">
      <Link to={`/detailproduct/${item.id}`}>
        <div className="lately-card-info">
          <span className="lately-card-title">{item.product_title}</span>
          <span className="lately-card-price">{item.product_price}</span>
        </div>
      </Link>
    </div>
  );
};

export default LatelyCard;

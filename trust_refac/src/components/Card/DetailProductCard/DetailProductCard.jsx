import "./DetailProductCard.css";
import { Form, Button } from "antd";

const DetailProductCard = ({ item }) => {
  return (
    <>
      <div className="detailproductcard">
        <div className="productImg">
          <img
            className="product-img"
            src={item.imgsrc}
            alt={item.product_title}
          />
        </div>
        <div className="productContent">
          <div className="productCategory">
            {item.highcategory}/{item.category}
          </div>
          <div className="productTitle">{item.product_title}</div>
          <div className="productPrice">{item.product_price}</div>
          <div className="productdes">{item.product_des}</div>
          <div className="info">
            <table className="productView">
              <tbody>
                <tr>
                  <td>조회 수 : </td>
                  <td>{item.product_view}</td>
                </tr>
              </tbody>
            </table>
            <table className="product_deta">
              <tbody>
                <tr>
                  <td>작성일 : </td>
                  <td>{item.product_day}</td>
                </tr>
                <tr>
                  <td>작성자 : </td>
                  <td>{item.seller}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Form.Item>
        <Button id="buy-button" size="middle" htmlType="submit">
          구매 희망
        </Button>
      </Form.Item>
    </>
  );
};

export default DetailProductCard;

import React, { useState } from "react";
import {
  Divider,
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Upload,
} from "antd";
import "./Product.css";
import { UploadOutlined } from "@ant-design/icons";

const { Option, OptGroup } = Select;

const Product = () => {
  const [selectedCategory, setSelectedCategory] = useState(""); // 첫 번째 Select의 선택 값

  // 두 번째 Select의 옵션 데이터
  const subcategories = {
    패션: ["아우터", "상의", "바지", "신발"],
    악세사리: ["반지", "팔찌", "목걸이", "시계"],
    생필품: ["주방용품", "욕실용품", "세탁,빨래용품", "기타"],
    가전제품: ["TV", "에어컨", "건조기", "기타"],
  };

  return (
    <>
      <div id="upload-container">
        <div className="upload-page-title">
          <h1>물건 등록</h1>
        </div>
        <Form name="상품 업로드">
          {/* 첫 번째 Select */}
          <Form.Item
            name="mainCategory"
            label={
              <div className="upload-label">
                <span>카</span>
                <span>테</span>
                <span>고</span>
                <span>리</span>
              </div>
            }
            rules={[{ required: true, message: "카테고리를 골라주세요" }]}
          >
            <Select
              onChange={(value) => setSelectedCategory(value)} // 선택 값 상태 업데이트
              placeholder="카테고리를 선택해주세요"
            >
              <Option value="패션">패션</Option>
              <Option value="악세사리">악세사리</Option>
              <Option value="생필품">생필품</Option>
              <Option value="가전제품">가전제품</Option>
            </Select>
          </Form.Item>

          {/* 두 번째 Select */}
          <Form.Item
            name="subCategory"
            label={
              <div className="upload-label">
                <span>상</span>
                <span>세</span>
                <span>카</span>
                <span>테</span>
                <span>고</span>
                <span>리</span>
              </div>
            }
            rules={[{ required: true, message: "상세 카테고리를 골라주세요" }]}
          >
            <Select
              placeholder="상세 카테고리를 선택해주세요"
              disabled={!selectedCategory} // 첫 번째 Select가 선택되지 않으면 비활성화
            >
              {subcategories[selectedCategory]?.map((subcategory) => (
                <Option key={subcategory} value={subcategory}>
                  {subcategory}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Divider />
          <Form.Item
            name="upload"
            label={
              <div className="upload-label">
                <span>상</span>
                <span>품</span>
                <span>사</span>
                <span>진</span>
              </div>
            }
            rules={[{ required: true, message: "물건 사진을 등록해주세요" }]}
          >
            <Upload>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Divider />
          <Form.Item
            name="name"
            label={
              <div className="upload-label">
                <span>상</span>
                <span>품</span>
                <span>이</span>
                <span>름</span>
              </div>
            }
            rules={[{ required: true, message: "상품 이름을 입력해주세요" }]}
          >
            <Input
              className="upload-name"
              size="large"
              placeholder="상품 이름을 입력해주세요"
            />
          </Form.Item>
          <Divider />
          <Form.Item
            name="price"
            label={
              <div className="upload-label">
                <span>상</span>
                <span>품</span>
                <span>가</span>
                <span>격</span>
              </div>
            }
            rules={[{ required: true, message: "상품 가격을 입력해주세요" }]}
          >
            <InputNumber
              className="upload-price"
              size="large"
              defaultValue={0}
            />
          </Form.Item>
          <Divider />
          <Form.Item
            name="description"
            label={
              <div className="upload-label">
                <span>상</span>
                <span>품</span>
                <span>소</span>
                <span>개</span>
              </div>
            }
            rules={[{ required: true, message: "상품 소개를 입력해주세요" }]}
          >
            <Input.TextArea
              size="large"
              id="product-description"
              showCount
              maxLength={1000}
              placeholder="상품 소개를 적어주세요"
            />
          </Form.Item>
          <Form.Item>
            <Button id="submit-button" size="large" htmlType="submit">
              물건 등록
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Product;

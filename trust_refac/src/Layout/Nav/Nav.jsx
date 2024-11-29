import { useState, useEffect } from "react";
import "./Nav.css";
import PwUpdateModal from "../../components/Modal/PwUpdateModal";
import { Input } from "antd";
import { Link } from "react-router-dom";
import logopng from "../../assets/images/logo.png";
const { Search } = Input;


const Nav = ({ openLoginModal }) => {
  const [dropdownStates, setDropdownStates] = useState({
    myInfo: false,
    clothes: false,
    essentials: false,
    accessories: false,
    electronics: false,
  });

  const toggleDropdown = (key) => {
    setDropdownStates((prev) => {
      const newState = Object.keys(prev).reduce(
        (acc, curr) => ({ ...acc, [curr]: false }),
        {}
      );
      return { ...newState, [key]: !prev[key] };
    });
  };

  const closeAllDropdowns = () => {
    setDropdownStates({
      myInfo: false,
      clothes: false,
      essentials: false,
      accessories: false,
      electronics: false,
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".dropdown-menu") &&
        !event.target.closest(".category_wrapper") &&
        !event.target.closest(".my_info_wrapper")
      ) {
        closeAllDropdowns();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const onSearch = (value) => {
    console.log("Search input:", value);
  };

  return (
    <>
      <div className="navigation">
        <div className="sign-menu">
          <button className="signin" onClick={openLoginModal}>
            로그인
          </button>
          <div className="my_info_wrapper">
            <div
              className="my_info_page"
              onClick={() => toggleDropdown("myInfo")}
            >
              내 정보
            </div>
            {dropdownStates.myInfo && (
              <div className="dropdown-menu">
                <Link to="/infoupdate">
                  <div className="dropdown-item" onClick={closeAllDropdowns}>정보 수정</div>
                </Link>
                <PwUpdateModal onClick={closeAllDropdowns} />
                <div className="dropdown-item">내 상점</div>
              </div>
            )}
          </div>
        </div>
        <div className="top-bar">
          <Link className="site-title" to="/">
            <img src={logopng} alt="Logo" />
            <div className="title">TRUST</div>
          </Link>
          <Link to="/product">
            <div className="upload">물건등록</div>
          </Link>
          <div className="category">
            <div className="category_wrapper">
              <div
                className="clothes"
                onClick={() => toggleDropdown("clothes")}
              >
                옷
              </div>
              {dropdownStates.clothes && (
                <div className="dropdown-menu">
                  <div className="dropdown-item">아우터</div>
                  <div className="dropdown-item">상의</div>
                  <div className="dropdown-item">바지</div>
                  <div className="dropdown-item">신발</div>
                </div>
              )}
            </div>
            <div className="category_wrapper">
              <div
                className="accessories"
                onClick={() => toggleDropdown("accessories")}
              >
                악세사리
              </div>
              {dropdownStates.accessories && (
                <div className="dropdown-menu">
                  <div className="dropdown-item">반지</div>
                  <div className="dropdown-item">팔찌</div>
                  <div className="dropdown-item">목걸이</div>
                  <div className="dropdown-item">시계</div>
                </div>
              )}
            </div>
            <div className="category_wrapper">
              <div
                className="essentials"
                onClick={() => toggleDropdown("essentials")}
              >
                생필품
              </div>
              {dropdownStates.essentials && (
                <div className="dropdown-menu">
                  <div className="dropdown-item">주방용품</div>
                  <div className="dropdown-item">욕실용품</div>
                  <div className="dropdown-item">세탁용품</div>
                  <div className="dropdown-item">기타</div>
                </div>
              )}
            </div>
            <div className="category_wrapper">
              <div
                className="electronics"
                onClick={() => toggleDropdown("electronics")}
              >
                가전제품
              </div>
              {dropdownStates.electronics && (
                <div className="dropdown-menu">
                  <div className="dropdown-item">TV</div>
                  <div className="dropdown-item">에어컨</div>
                  <div className="dropdown-item">건조기</div>
                  <div className="dropdown-item">기타</div>
                </div>
              )}
            </div>
          </div>
          <div className="search">
            <Search
              className="search-input"
              placeholder="검색어를 입력하세요"
              onSearch={onSearch}
              enterButton
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;

import "../../assets/styles/Nav.css";
import { Input } from "antd";
const { Search } = Input;

const Nav = ({openLoginModal}) => {
    // onSearch 함수 정의
    const onSearch = (value) => {
        console.log("Search input:", value);
        // 검색 처리 로직 추가 가능
    };

    return (
        <>
        <div className="navigation">
            <div className="sign-menu">
                <button className="signin" onClick={openLoginModal}>로그인</button>
            </div>
            <div className="top-bar">
                <div className="site-title">
                    <img src="logo.png" alt="Logo" />
                    <div className="title">TRUST</div>
                </div>
                <div className="upload">물건등록</div>
                <div className="category">
                    <div className="a">옷</div>
                    <div className="b">생필품</div>
                    <div className="c">악세사리</div>
                    <div className="d">가전제품</div>
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

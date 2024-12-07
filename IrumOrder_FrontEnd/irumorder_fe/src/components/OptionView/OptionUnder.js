import React from 'react';
import './OptionUnder.css';
import { useNavigate, useParams } from 'react-router-dom'; // React Router의 useNavigate 사용

const INITIAL_OPTIONS = {
    userId: 1,
    Price: 0,
    menuId: null,
    name: "",
    quantity: 1,
    menuOptions: {
        useCup: "",
        addShot: false,
        addVanilla: false,
        addHazelnut: false,
        light: false,
    },
};

const OptionUnder = ({store, options, setOptions}) => {//여기서 가격 받아서
    const nav = useNavigate(); // 페이지 이동을 위한 useNavigate 훅
    const increaseQuantity = () => {
        setOptions((prevOptions) => ({
            ...prevOptions,
            quantity: prevOptions.quantity + 1, // 수량 증가
        }));
    };
    const decreaseQuantity = () => {
        setOptions((prevOptions) => ({
            ...prevOptions,
            quantity: prevOptions.quantity > 1 ? prevOptions.quantity - 1 : 1, // 최소 1 유지
        }));
    };
    // 가격 계산 함수 (옵션에 따라 다르게 계산 가능)
    const calculatePrice = () => {
        const basePrice = options.Price || 0; // 기본 가격
        const addShotPrice = options.menuOptions.addShot ? 500 : 0;
        const addVanillaPrice = options.menuOptions.addVanilla ? 500 : 0;
        const addHazelnutPrice = options.menuOptions.addHazelnut ? 500 : 0;
        options.Price = basePrice + addShotPrice + addVanillaPrice + addHazelnutPrice;
        return basePrice + addShotPrice + addVanillaPrice + addHazelnutPrice;
    };

    
    //장바구니에 추가 버튼 클릭
    const handleCartClick = () => {
        if (!options.menuOptions.useCup) {
            // 컵 선택이 안 되었을 경우
            alert('컵을 선택해주세요.');
            return;
        }
        const userId = options.userId; // options에서 userId 가져오기
        if (!userId) {
            console.error("User ID가 없습니다.");
            return;
        }

        // 컵이 선택된 경우 경고 메시지 초기화 후 페이지 이동
        nav(`/store/${store}/cart/${userId}`, { state: { options }, replace: true });
        setOptions(INITIAL_OPTIONS);
    };

    
return (
    <div className="OptionUnder">
        <div className="quantity">
                <h3>수량</h3>
                <div className="quantity-button">
                    <button onClick={decreaseQuantity}>-</button>
                    <span>{options.quantity}</span>
                    <button onClick={increaseQuantity}>+</button>
                </div>
            </div>
            <div className="gocart">
                <button onClick={handleCartClick}>
                    {calculatePrice() * options.quantity}원 장바구니에 담기
                    </button>
        </div>
    </div>
    );
}

export default OptionUnder;
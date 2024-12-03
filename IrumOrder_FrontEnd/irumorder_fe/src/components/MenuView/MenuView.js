import React from 'react';
import './MenuView.css';
import Toolbar from './Toolbar';
import Category from './Category';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const Menu = () => {

    const nav = useNavigate();
    const { store } = useParams();
    
    const handleBack = () => {
        nav(-1);
    };
    const handleCart = () => {
        nav('/cart');
    };


    return (
        <div className="Menu">
            <Toolbar title="주문" onBack={handleBack} onCart={handleCart} />
            <div className="header">
                <h2>주문할 메뉴를 선택하세요.</h2>
                <div className="store">
                    <img src="/images/location.png" alt="매장 위치" className="location-icon" />
                    <span>{store}</span> 
                </div>
                <Category />
            </div>
        </div>
    );
};

export default Menu;
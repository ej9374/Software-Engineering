// src/components/Category.js
import React, { useEffect, useState } from 'react';
import './Category.css';

const Category = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // API 호출
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:8080/category/getAllcategory'); // 백엔드 URL
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="Category">
            {categories.map((category, index) => (
                <button key={index} className="button">
                    {category.name} {/* 카테고리 이름 */}
                </button>
            ))}
        </div>
    );
};

export default Category;

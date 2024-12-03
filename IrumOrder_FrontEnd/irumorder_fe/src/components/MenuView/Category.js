import React, { useEffect, useState } from 'react';
import './Category.css';

const Category = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // API 호출
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:8080/category/getAllCategory'); // 백엔드 URL
<<<<<<< HEAD
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
=======
>>>>>>> d88a90bcc3aed58df8f8307e2cf33b2eadcef68b
                const data = await response.json();
                setCategories(data); // 데이터를 상태에 저장
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="Category">
            {categories.map((category, index) => (
                <button key={index} className={`button ${index === 0 ? 'selected' : ''}`}>
                    {category.name}
                </button>
            ))}
        </div>
    );
};

export default Category;

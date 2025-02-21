import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import ProductList from '../components/ProductList';
import { getProductsByCategory } from '../api/api';

const CategoryPage = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProductsByCategory(category);
            setProducts(data);
        };
        fetchProducts();
    }, [category]);

    return (
        <div>
            <h1>{category}</h1>
            <ProductList products={products} />
        </div>
    );
};

export default CategoryPage;
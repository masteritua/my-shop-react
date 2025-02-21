import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
    return (
        <Row>
            {products.map((product) => (
                <Col key={product.id} sm={6} md={4} lg={3}>
                    <ProductCard product={product} />
                </Col>
            ))}
        </Row>
    );
};

export default ProductList;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Image, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import { getProductById } from '../api/api';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const cartItem = cartItems.find((item) => item.id === parseInt(id));
    const quantity = cartItem ? cartItem.quantity : 0;

    useEffect(() => {
        const fetchProduct = async () => {
            const data = await getProductById(id);
            setProduct(data);
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            dispatch(addToCart({ ...product, quantity: 1 }));
        }
    };

    const handleIncreaseQuantity = () => {
        dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }));
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }));
        } else {
            dispatch(removeFromCart(product.id));
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.title} fluid />
                </Col>
                <Col md={6}>
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                    {quantity > 0 ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                            <Button variant="secondary" onClick={handleDecreaseQuantity}>
                                -
                            </Button>
                            <span>{quantity}</span>
                            <Button variant="secondary" onClick={handleIncreaseQuantity}>
                                +
                            </Button>
                        </div>
                    ) : (
                        <Button variant="primary" onClick={handleAddToCart} style={{ marginBottom: '20px' }}>
                            Add to Cart
                        </Button>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetail;
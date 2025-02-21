import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const cartItem = cartItems.find((item) => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    const handleAddToCart = () => {
        dispatch(addToCart(product));
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

    return (
        <Card style={{ width: '18rem', margin: '10px' }}>
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>${product.price}</Card.Text>
                </Card.Body>
            </Link>
            <div style={{ padding: '0 15px 15px 15px' }}>
                {quantity > 0 ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                        <Button variant="secondary" onClick={handleDecreaseQuantity}>
                            -
                        </Button>
                        <span>{quantity}</span>
                        <Button variant="secondary" onClick={handleIncreaseQuantity}>
                            +
                        </Button>
                    </div>
                ) : (
                    <Button variant="primary" onClick={handleAddToCart} style={{ marginBottom: '10px' }}>
                        Add to Cart
                    </Button>
                )}
            </div>
        </Card>
    );
};

export default ProductCard;
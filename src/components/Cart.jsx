import React from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const handleQuantityChange = (id, quantity) => {
        if (quantity > 0) {
            dispatch(updateQuantity({ id, quantity }));
        }
    };

    const handleRemoveItem = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td>${item.price}</td>
                                <td>
                                    <Form.Control
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                        min="1"
                                    />
                                </td>
                                <td>${item.price * item.quantity}</td>
                                <td>
                                    <Button variant="danger" onClick={() => handleRemoveItem(item.id)}>
                                        Remove
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <h4>Total: ${totalPrice.toFixed(2)}</h4>
                    <Button variant="danger" onClick={handleClearCart}>
                        Clear Cart
                    </Button>
                    <Link to="/checkout">
                        <Button variant="primary" style={{ marginLeft: '10px' }}>
                            Proceed to Checkout
                        </Button>
                    </Link>
                </>
            )}
        </div>
    );
};

export default Cart;
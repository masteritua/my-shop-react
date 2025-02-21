import React, { useState } from 'react';
import { Container, Form, Button, Alert, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.items);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        paymentMethod: 'creditCard',
    });
    const [orderPlaced, setOrderPlaced] = useState(false);

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Order Details:', {
            ...formData,
            items: cartItems,
            totalPrice,
        });

        dispatch(clearCart());
        setOrderPlaced(true);

        setTimeout(() => {
            navigate('/');
        }, 3000);
    };

    if (cartItems.length === 0 && !orderPlaced) {
        return (
            <Container className="mt-5 text-center">
                <h2>Your cart is empty</h2>
                <Button variant="primary" onClick={() => navigate('/')}>
                    Go to Home
                </Button>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <h2>Checkout</h2>
            {orderPlaced ? (
                <Alert variant="success">
                    <Alert.Heading>Order Placed Successfully!</Alert.Heading>
                    <p>Thank you for your purchase. You will be redirected to the home page shortly.</p>
                </Alert>
            ) : (
                <>
                    <Table striped bordered hover className="mb-4">
                        <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td>{item.quantity}</td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>${(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>

                    <h4 className="mb-4">Total: ${totalPrice.toFixed(2)}</h4>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formAddress">
                            <Form.Label>Shipping Address</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPaymentMethod">
                            <Form.Label>Payment Method</Form.Label>
                            <Form.Select
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="creditCard">Credit Card</option>
                                <option value="paypal">PayPal</option>
                                <option value="cashOnDelivery">Cash on Delivery</option>
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Place Order
                        </Button>
                    </Form>
                </>
            )}
        </Container>
    );
};

export default CheckoutPage;
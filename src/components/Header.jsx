import React, { useState } from 'react';
import { Navbar, Container, Nav, Badge, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cart from './Cart';

const Header = () => {
    const [showCart, setShowCart] = useState(false);
    const cartItems = useSelector((state) => state.cart.items);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleShowCart = () => setShowCart(true);
    const handleCloseCart = () => setShowCart(false);

    return (
        <>
            <Navbar bg="dark" variant="dark" fixed="top" style={{ zIndex: 1000 }}>
                <Container>
                    <Navbar.Brand as={Link} to="/">My Shop</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/category/electronics">Electronics</Nav.Link>
                        <Nav.Link as={Link} to="/category/jewelery">Jewelery</Nav.Link>
                        <Nav.Link as={Link} to="/category/men's clothing">Men's Clothing</Nav.Link>
                        <Nav.Link as={Link} to="/category/women's clothing">Women's Clothing</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link onClick={handleShowCart} style={{ cursor: 'pointer' }}>
                            <i className="fas fa-shopping-cart"></i>
                            {totalItems > 0 && <Badge bg="danger">{totalItems}</Badge>}
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            {/* Попап корзини */}
            <Modal show={showCart} onHide={handleCloseCart} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Your Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Cart />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCart}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseCart}>
                        Checkout
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Header;
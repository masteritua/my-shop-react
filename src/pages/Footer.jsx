import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#f8f9fa', padding: '20px 0', marginTop: 'auto' }}>
            <Container>
                <Row>
                    <Col md={4}>
                        <h5>About Us</h5>
                        <p>We are the best online store for electronics, clothing, and more. Shop with us for the best deals!</p>
                    </Col>
                    <Col md={4}>
                        <h5>Quick Links</h5>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li><a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</a></li>
                            <li><a href="/category/electronics" style={{ textDecoration: 'none', color: 'inherit' }}>Electronics</a></li>
                            <li><a href="/category/jewelery" style={{ textDecoration: 'none', color: 'inherit' }}>Jewelery</a></li>
                            <li><a href="/category/men's clothing" style={{ textDecoration: 'none', color: 'inherit' }}>Men's Clothing</a></li>
                            <li><a href="/category/women's clothing" style={{ textDecoration: 'none', color: 'inherit' }}>Women's Clothing</a></li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5>Contact Us</h5>
                        <p>Email: support@myshop.com</p>
                        <p>Phone: +1 234 567 890</p>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <p style={{ marginTop: '20px', marginBottom: '0' }}>
                            &copy; {new Date().getFullYear()} My Shop. All rights reserved.
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
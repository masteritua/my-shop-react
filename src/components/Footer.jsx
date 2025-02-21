import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

const Footer = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Text>© 2025 My Shop. All rights reserved.</Navbar.Text>
            </Container>
        </Navbar>
    );
};

export default Footer;
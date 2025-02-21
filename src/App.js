import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import ProductDetail from './pages/ProductDetail';
import CheckoutPage from './pages/CheckoutPage';

const App = () => {
    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/category/:category" element={<Home />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
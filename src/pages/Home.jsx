import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, ListGroup, Pagination } from 'react-bootstrap';
import ProductList from '../components/ProductList';
import { getProducts, getCategories, getProductsByCategory } from '../api/api';

const ITEMS_PER_PAGE = parseInt(process.env.REACT_APP_ITEMS_PER_PAGE, 10);

const Home = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const categoriesData = await getCategories();
            setCategories(categoriesData);

            const productsData = category
                ? await getProductsByCategory(category)
                : await getProducts();
            setProducts(productsData);
        };
        fetchData();
    }, [category]);

    const getCategoryTitle = () => {
        if (!category) return 'Welcome to My Shop';
        return `${category.charAt(0).toUpperCase() + category.slice(1)}`;
    };

    const paginatedProducts = products.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <Row>
            {/* Категорії зліва */}
            <Col md={3}>
                <ListGroup>
                    <ListGroup.Item
                        as={Link}
                        to="/"
                        action
                        active={!category}
                    >
                        All Categories
                    </ListGroup.Item>
                    {categories.map((cat) => (
                        <ListGroup.Item
                            key={cat}
                            as={Link}
                            to={`/category/${cat}`}
                            action
                            active={category === cat}
                        >
                            {cat}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>

            {/* Список товарів */}
            <Col md={9}>
                <h1>{getCategoryTitle()}</h1> {/* Динамічний заголовок */}
                <ProductList products={paginatedProducts} />

                {/* Пагінація */}
                {totalPages > 1 && (
                    <Pagination className="mt-4">
                        <Pagination.Prev
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        />
                        {[...Array(totalPages)].map((_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === currentPage}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        />
                    </Pagination>
                )}
            </Col>
        </Row>
    );
};

export default Home;
import { useState, useEffect } from 'react';
import { getProducts } from "../products";
import ProductCard from "./ProductCard";
import styles from './ProductList.module.css';

export default function ProductList({ selectedCategory, addToCart }) {

    // Stores products received from the server
    const [products, setProducts] = useState([]);

    // Stores loading state
    const [loading, setLoading] = useState(true);

    // Stores error message
    const [error, setError] = useState('');

    // Stores what the user types
    const [searchTerm, setSearchTerm] = useState('');

    // Stores the actual search
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch products from the server
    useEffect(() => {
        getProducts()
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    // Show loading message
    if (loading) {
        return <p>Loading products...</p>;
    }

    // Show error message
    if (error) {
        return <p>Error: {error}</p>;
    }

    // Handle search button
    function handleSearch(event) {
        event.preventDefault();

        setSearchQuery(
            searchTerm.trim().toLowerCase()
        );
    }

    // Filter products by category
    const filteredProducts =
        selectedCategory === 'all'
            ? products
            : products.filter(
                (product) =>
                    product.category.toLowerCase() ===
                    selectedCategory.toLowerCase()
            );

    // Filter products by search
    const searchedProducts =
        filteredProducts.filter((product) =>
            product.name.toLowerCase().includes(searchQuery) ||
            product.category.toLowerCase().includes(searchQuery)
        );

    return (
        <div>

            {/* Search form */}
            <form
                className={styles.search}
                onSubmit={handleSearch}
            >

                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(event) =>
                        setSearchTerm(event.target.value)
                    }
                />

                <button type="submit">
                    Search
                </button>

                <button type="button"
                    onClick={() => {
                        setSearchTerm('')
                        setSearchQuery('')
                    }}>

                    Clear
                </button>

            </form>

            {/* Product grid */}
            <div className={styles.grid}>

                {searchedProducts.length === 0 ? (

                    <p>No Products found</p>

                ) : (

                    searchedProducts.map((product) => (

                        <ProductCard
                            key={product.id}
                            product={product}
                            addToCart={addToCart}
                        />

                    ))

                )}

            </div>

        </div>
    );
}
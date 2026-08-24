import { useEffect, useState } from "react";
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from "../products";

import styles from "./Admin.module.css";

export default function Admin() {

    // Stores products from the server
    const [products, setProducts] = useState([]);

    // Stores the ID of the product being edited
    const [editingId, setEditingId] = useState(null);

    // Stores form data
    const [form, setForm] = useState({
        name: "",
        category: "",
        price: "",
        details: "",
        image: ""
    });

    // Load products when page opens
    useEffect(() => {
        loadProducts();
    }, []);

    // Get products from the server
    async function loadProducts() {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error("Failed to load products:", error);
        }
    }

    // Handle changes in the form
    function handleChange(event) {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    }

    // Add or update a product
    async function handleSubmit(event) {
        event.preventDefault();

        try {

            if (editingId) {

                // Update existing product
                await updateProduct(editingId, {
                    ...form,
                    price: Number(form.price)
                });

            } else {

                // Add new product
                await createProduct({
                    ...form,
                    price: Number(form.price)
                });
            }

            // Clear form
            setForm({
                name: "",
                category: "",
                price: "",
                details: "",
                image: ""
            });

            // Exit edit mode
            setEditingId(null);

            // Get updated products from server
            await loadProducts();

        } catch (error) {
            console.error("Failed to save product:", error);
        }
    }

    // Load product details into the form
    function handleEdit(product) {

        setEditingId(product.id);

        setForm({
            name: product.name,
            category: product.category,
            price: product.price,
            details: product.details,
            image: product.image
        });

        // Scroll to the form
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    // Delete product
    async function handleDelete(id) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await deleteProduct(id);

            // Reload products
            await loadProducts();

        } catch (error) {
            console.error("Failed to delete product:", error);
        }
    }

    // Cancel editing
    function handleCancel() {

        setEditingId(null);

        setForm({
            name: "",
            category: "",
            price: "",
            details: "",
            image: ""
        });
    }

    return (
        <main className={styles.dash}>

            {/* Dashboard heading */}
            <h1>Admin Dashboard</h1>

            {/* Product form */}
            <section className={styles.formSection}>

                <h2>
                    {editingId
                        ? "Edit Product"
                        : "Add New Product"}
                </h2>

                <form
                    className={styles.form}
                    onSubmit={handleSubmit}
                >

                    {/* Product name */}
                    <input
                        name="name"
                        type="text"
                        placeholder="Product name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />

                    {/* Category */}
                    <input
                        name="category"
                        type="text"
                        placeholder="Category"
                        value={form.category}
                        onChange={handleChange}
                        required
                    />

                    {/* Price */}
                    <input
                        name="price"
                        type="number"
                        placeholder="Price"
                        value={form.price}
                        onChange={handleChange}
                        required
                    />

                    {/* Image URL */}
                    <input
                        name="image"
                        type="text"
                        placeholder="Image URL"
                        value={form.image}
                        onChange={handleChange}
                        required
                    />

                    {/* Product details */}
                    <textarea
                        name="details"
                        placeholder="Product details"
                        value={form.details}
                        onChange={handleChange}
                        required
                    />

                    <div className={styles.formButtons}>

                        <button
                            type="submit"
                            className={styles.saveButton}
                        >
                            {editingId
                                ? "Update Product"
                                : "Add Product"}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                className={styles.cancelButton}
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        )}

                    </div>

                </form>

            </section>

            <hr />

            {/* Product list */}
            <section>

                <h2>Products ({products.length})</h2>

                <div className={styles.products}>

                    {products.map((product) => (

                        <article
                            className={styles.product}
                            key={product.id}
                        >

                            {/* Product image */}
                            <div className={styles.imageWrapper}>

                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className={styles.image}
                                />

                            </div>

                            {/* Product information */}
                            <div className={styles.productInfo}>

                                <h3>{product.name}</h3>

                                <p className={styles.category}>
                                    {product.category}
                                </p>

                                <p className={styles.details}>
                                    {product.details}
                                </p>

                                <p className={styles.price}>
                                    Ksh. {Number(product.price).toLocaleString()}
                                </p>

                                {/* Admin actions */}
                                <div className={styles.actions}>

                                    <button
                                        className={styles.editButton}
                                        onClick={() =>
                                            handleEdit(product)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className={styles.deleteButton}
                                        onClick={() =>
                                            handleDelete(product.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        </article>

                    ))}

                </div>

            </section>

        </main>
    );
}
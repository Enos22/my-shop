import styles from "./Cart.module.css";
import { useNavigate } from "react-router-dom";


export default function Cart({ cart, removeFromCart, updateQuantity }) {
    const navigate = useNavigate();


    // Calculate the total price
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    // Show empty cart
    if (cart.length === 0) {
        return (
            <main className={styles.emptyCart}>
                <h1>Your Cart</h1>
                <p>Your cart is currently empty.</p>
            </main>
        );
    }

    return (
        <main className={styles.cart}>

            <h1 className={styles.title}>
                Your Shopping Cart Has:
            </h1>

            <table className={styles.cartTable}>

                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total Price</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {cart.map((item) => (
                        <tr key={item.id}>

                            {/* Product image */}
                            <td>
                                <img
                                    className={styles.image}
                                    src={item.image}
                                    alt={item.name}
                                />
                            </td>

                            {/* Product name */}
                            <td className={styles.productName}>
                                {item.name}
                            </td>

                            {/* Quantity */}
                            <td className={styles.quantity}>
                                <button
                                    className={styles.quantityButton}
                                    onClick={() => updateQuantity(item.id, -1)}
                                >
                                    −
                                </button>

                                <span className={styles.quantityNumber}>
                                    {item.quantity}
                                </span>

                                <button
                                    className={styles.quantityButton}
                                    onClick={() => updateQuantity(item.id, 1)}
                                >
                                    +
                                </button>
                            </td>

                            {/* Unit price */}
                            <td className={styles.unitPrice}>
                                Ksh. {item.price}
                            </td>

                            {/* Total price for this product */}
                            <td className={styles.itemTotal}>
                                Ksh. {item.price * item.quantity}
                            </td>

                            {/* Remove button */}
                            <td>
                                <button
                                    className={styles.removeButton}
                                    onClick={() =>
                                        removeFromCart(item.id)
                                    }
                                >
                                    Remove
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>

            </table>

            {/* Cart total */}
            <div className={styles.summary}>
                <div>
                    <p className={styles.total}>
                        Grand Total: Ksh. {total}
                    </p>

                    <button className={styles.checkoutButton}
                        onClick={() => navigate("/checkout")}
                    >
                        Checkout
                    </button>
                </div>
            </div>

        </main>
    );
}
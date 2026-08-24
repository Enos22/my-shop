import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Checkout.module.css";

export default function Checkout({ cart, clearCart }) {

    // Stores the selected payment method
    const [paymentMethod, setPaymentMethod] = useState("cash");

    // Stores customer details
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    // Stores checkout message
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    // Calculate total price
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    // Handle checkout
    function handleCheckout(event) {
        event.preventDefault();

        // Check customer name
        if (!name.trim()) {
            setMessage("Please enter your name.");
            return;
        }

        // Check phone number for M-Pesa
        if (paymentMethod === "mpesa" && !phone.trim()) {
            setMessage("Please enter your M-Pesa phone number.");
            return;
        }

        // Cash payment
        if (paymentMethod === "cash") {
            setMessage(
                "Order placed successfully. Please pay with cash upon delivery."
            );
        }

        // M-Pesa payment
        if (paymentMethod === "mpesa") {
            setMessage(
                "M-Pesa payment request will be sent to your phone."
            );
        }
    }

    return (
        <main className={styles.checkout}>

            <h1>Checkout</h1>

            {/* Order summary */}
            <section className={styles.orderSummary}>

                <h2>Order Summary</h2>

                {cart.map((item) => (
                    <div
                        className={styles.item}
                        key={item.id}
                    >
                        <span>
                            {item.name} × {item.quantity}
                        </span>

                        <span>
                            Ksh. {item.price * item.quantity}
                        </span>
                    </div>
                ))}

                <h2 className={styles.total}>
                    Total: Ksh. {total}
                </h2>

            </section>

            {/* Checkout form */}
            <form
                className={styles.form}
                onSubmit={handleCheckout}
            >

                <h2>Customer Details</h2>

                <label>
                    Name
                </label>

                <input
                    type="text"
                    value={name}
                    onChange={(event) =>
                        setName(event.target.value)
                    }
                    placeholder="Enter your name"
                />

                <label>
                    Phone Number
                </label>

                <input
                    type="tel"
                    value={phone}
                    onChange={(event) =>
                        setPhone(event.target.value)
                    }
                    placeholder="07XXXXXXXX"
                />

                <h2>Payment Method</h2>

                {/* Cash */}
                <label className={styles.paymentOption}>
                    <input
                        type="radio"
                        name="payment"
                        value="cash"
                        checked={paymentMethod === "cash"}
                        onChange={(event) =>
                            setPaymentMethod(event.target.value)
                        }
                    />

                    Cash on Delivery
                </label>

                {/* M-Pesa */}
                <label className={styles.paymentOption}>
                    <input
                        type="radio"
                        name="payment"
                        value="mpesa"
                        checked={paymentMethod === "mpesa"}
                        onChange={(event) =>
                            setPaymentMethod(event.target.value)
                        }
                    />

                    M-Pesa
                </label>

                {/* Message */}
                {message && (
                    <p className={styles.message}>
                        {message}
                    </p>
                )}

                <button
                    type="submit"
                    className={styles.checkoutButton}
                >
                    {paymentMethod === "cash"
                        ? "Place Order"
                        : "Pay with M-Pesa"}
                </button>

                <button
                    type="button"
                    className={styles.backButton}
                    onClick={() => navigate("/cart")}
                >
                    Back to Cart
                </button>

            </form>

        </main>
    );
}
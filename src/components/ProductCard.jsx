//receive product as a prop(from ProductList ) and display it in a card format
import styles from './ProductCard.module.css';

export default function ProductCard({ product, addToCart }) {
    return (
        <div className={styles.card}>

            <div className={styles.imgWrapper}>
                <img className={styles.image} src={product.image} alt={product.name} />
            </div>
            <h2>{product.name}</h2>
            <p>{product.category}</p>
            <p>{product.details}</p>
            <strong className={styles.price}>Ksh.{product.price}</strong>

            <button className={styles['add-to-cart']}
                onClick={() => addToCart(product)}>
                Add to Cart
            </button>
        </div>
    );
}
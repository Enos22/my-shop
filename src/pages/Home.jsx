import Sidebar from "../components/Sidebar";
import ProductList from "../components/ProductList";


export default function Home({ selectedCategory, onCategoryChange, addToCart }) {
    return (
        <main className="main-layout">
            <Sidebar
                selectedCategory={selectedCategory}
                onCategoryChange={onCategoryChange}
            />
            <ProductList
                selectedCategory={selectedCategory}
                addToCart={addToCart}
            />
        </main>
    );
}   
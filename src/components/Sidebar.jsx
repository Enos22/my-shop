

export default function Sidebar({ selectedCategory, onCategoryChange }) {
    const categories = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Beverages'];

    return (
        <aside>
            <h3>Categories</h3>

            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onCategoryChange(category.toLocaleLowerCase())}
                >
                    {category === "all" ? "All" : category}
                </button>

            ))}

        </aside>
    );
}
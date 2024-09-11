import Item from "./Item";

export default function PackingList({ items, onRemoveItem, onToggleItem }) {
    // List of possible categories
    const categories = [
        "clothes",
        "accessories",
        "documents",
        "toiletries",
        "tech",
        "misc",
    ];

    // Filter categories to include only those that have at least one item
    const nonEmptyCategories = categories.filter((category) =>
        items.some((item) => item.category === category)
    );

    return (
        <div
            className={`list ${
                nonEmptyCategories.length > 1 ? "multiple" : ""
            }`}
        >
            {/* Render a section for each non-empty category */}
            {nonEmptyCategories.map((category) => {
                // Filter items for the current category
                const categoryItems = items.filter(
                    (item) => item.category === category
                );

                return (
                    <div className={category} key={category}>
                        {/* Display the category name */}
                        <h2>{category.toUpperCase()}</h2>
                        <ul>
                            {/* Render an Item component for each item in the category */}
                            {categoryItems.map((item) => (
                                <Item
                                    item={item}
                                    onRemoveItem={onRemoveItem}
                                    onToggleItem={onToggleItem}
                                    key={item.id}
                                />
                            ))}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
}

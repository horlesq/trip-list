import Item from "./Item";

export default function PackingList({ items, onRemoveItem, onToggleItem }) {
    const categories = [
        "clothes",
        "accessories",
        "documents",
        "toiletries",
        "tech",
        "misc",
    ];

    const nonEmptyCategories = categories.filter((category) =>
        items.some((item) => item.category === category)
    );

    return (
        <div
            className={`list ${
                nonEmptyCategories.length > 1 ? "multiple" : ""
            }`}
        >
            {nonEmptyCategories.map((category) => {
                const categoryItems = items.filter(
                    (item) => item.category === category
                );

                return (
                    <div className={category} key={category}>
                        <h2>{category.toUpperCase()}</h2>
                        <ul>
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

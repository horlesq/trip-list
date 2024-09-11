import { useState } from "react";

export default function App() {
    const [items, setItems] = useState([]);

    function handleAddItem(item) {
        setItems((items) => [...items, item]);
    }

    function handleRemoveItem(id) {
        setItems((items) => items.filter((item) => item.id !== id));
    }

    function handleToggleItem(id) {
        setItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, packed: !item.packed } : item
            )
        );
    }

    return (
        <div className="app">
            <Logo />
            <Form onAddItem={handleAddItem} />
            <PackingList
                items={items}
                onRemoveItem={handleRemoveItem}
                onToggleItem={handleToggleItem}
            />
            <Stats items={items} />
        </div>
    );
}

function Logo() {
    return <h1>🧳 Trip List ✈️</h1>;
}

function Form({ onAddItem }) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("");

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!description || category === "") return;

        const newItem = {
            description: capitalizeFirstLetter(description),
            quantity,
            packed: false,
            category,
            id: Date.now(),
        };

        onAddItem(newItem);

        setDescription("");
        setQuantity(1);
        setCategory("");
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What are you packing?</h3>
            <select
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
            >
                {Array.from({ length: 20 }, (_, idx) => idx + 1).map((num) => (
                    <option value={num} key={num}>
                        {num}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Item..."
                value={description}
                onChange={(event) => setDescription(event.target.value)}
            ></input>
            <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
            >
                <option value="" disabled>
                    Select category
                </option>
                <option value="clothes">CLOTHES</option>
                <option value="accessories">ACCESSORIES</option>
                <option value="documents">DOCUMENTS</option>
                <option value="toiletries">TOILETRIES</option>
                <option value="tech">TECH</option>
                <option value="misc">MISC</option>
            </select>
            <button>Add</button>
        </form>
    );
}

function PackingList({ items, onRemoveItem, onToggleItem }) {
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

function Item({ item, onRemoveItem, onToggleItem }) {
    return (
        <li>
            <input
                type="checkbox"
                value={item.packed}
                onChange={() => onToggleItem(item.id)}
            ></input>
            <span
                className="outer"
                style={item.packed ? { textDecoration: "line-through" } : {}}
            >
                <span className="inner">
                    {item.quantity} {item.description}
                </span>
            </span>
            <button onClick={() => onRemoveItem(item.id)}>✖️ </button>
        </li>
    );
}

function Stats({ items }) {
    if (!items.length)
        return (
            <footer className="stats">
                <em>Start by adding some items to your trip list!</em>
            </footer>
        );

    const numItems = items.length;
    const numPacked = items.filter((item) => item.packed).length;
    const percentage = Math.round((numPacked / numItems) * 100);

    return (
        <footer className="stats">
            {percentage === 100 ? (
                <em>You got everithing packed! Ready to go ✈️</em>
            ) : (
                <em>
                    You have {numItems} {numItems !== 1 ? "items" : "item"} on
                    your list - You packed {numPacked} ({percentage}%) 🧳
                </em>
            )}
        </footer>
    );
}

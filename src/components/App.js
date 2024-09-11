import { useEffect, useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
    const [items, setItems] = useState(() => {
        const savedItems = localStorage.getItem("items");
        return savedItems ? JSON.parse(savedItems) : [];
    });

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items));
    }, [items]);

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

    function handleClearList() {
        const confirmed = window.confirm(
            "Are you sure you want to clear the list?"
        );
        if (confirmed) {
            setItems([]);
            localStorage.removeItem("items");
        }
    }

    return (
        <div className="app">
            <Logo />
            <Form onAddItem={handleAddItem} onClearList={handleClearList} />
            <PackingList
                items={items}
                onRemoveItem={handleRemoveItem}
                onToggleItem={handleToggleItem}
            />
            <Stats items={items} />
        </div>
    );
}

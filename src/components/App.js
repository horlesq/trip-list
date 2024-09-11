import { useEffect, useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
    // Initialize the state with items from local storage if available
    const [items, setItems] = useState(() => {
        const savedItems = localStorage.getItem("items");
        return savedItems ? JSON.parse(savedItems) : [];
    });

    // Update local storage whenever the items state changes
    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items));
    }, [items]);

    // Add a new item to the list
    function handleAddItem(item) {
        setItems((items) => [...items, item]);
    }

    // Remove an item from the list by its id
    function handleRemoveItem(id) {
        setItems((items) => items.filter((item) => item.id !== id));
    }

    // Toggle the packed status of an item by its id
    function handleToggleItem(id) {
        setItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, packed: !item.packed } : item
            )
        );
    }

    // Clear the list after user confirmation
    function handleClearList() {
        const confirmed = window.confirm(
            "Are you sure you want to clear the list?"
        );
        if (confirmed) {
            setItems([]); // Clear items from state
            localStorage.removeItem("items"); // Remove items from local storage
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

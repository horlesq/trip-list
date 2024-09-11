import { useState } from "react";

export default function Form({ onAddItem, onClearList }) {
    // State to manage input values
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("");

    // Capitalize the first letter of a string
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    // Handle form submission
    function handleSubmit(event) {
        event.preventDefault();

        // Prevent adding an item if description or category is missing
        if (!description || category === "") return;

        // Create a new item object
        const newItem = {
            description: capitalizeFirstLetter(description),
            quantity,
            packed: false,
            category,
            id: Date.now(), // Use timestamp as a unique ID
        };

        // Pass the new item to the parent component
        onAddItem(newItem);

        // Clear the input fields
        setDescription("");
        setQuantity(1);
        setCategory("");
    }

    // Handle clearing the list
    function handleClear(event) {
        onClearList();
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What are you packing?</h3>

            {/* Quantity selection */}
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

            {/* Description input */}
            <input
                type="text"
                placeholder="Item..."
                value={description}
                onChange={(event) => setDescription(event.target.value)}
            ></input>

            {/* Category selection */}
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

            {/* Submit and Clear buttons */}
            <button type="submit">Add</button>
            <button type="button" onClick={handleClear} className="clear">
                Clear
            </button>
        </form>
    );
}

import { useState } from "react";

export default function Form({ onAddItem, onClearList }) {
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

    function handleClear(event) {
        onClearList();
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
            <button type="submit">Add</button>
            <button type="button" onClick={handleClear} className="clear">
                Clear
            </button>
        </form>
    );
}

export default function Item({ item, onRemoveItem, onToggleItem }) {
    return (
        <li>
            {/* Checkbox to toggle the packed status of the item */}
            <input
                type="checkbox"
                value={item.packed} // Use 'checked' to reflect the packed status
                onChange={() => onToggleItem(item.id)} // Toggle the packed status when checked
            ></input>

            {/* Display item details with conditional styling */}
            <span
                className="outer"
                style={item.packed ? { textDecoration: "line-through" } : {}}
            >
                <span className="inner">
                    {item.quantity} {item.description}{" "}
                    {/* Display quantity and description */}
                </span>
            </span>

            {/* Button to remove the item from the list */}
            <button onClick={() => onRemoveItem(item.id)}>✖️ </button>
        </li>
    );
}

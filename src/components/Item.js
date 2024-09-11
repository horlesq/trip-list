export default function Item({ item, onRemoveItem, onToggleItem }) {
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

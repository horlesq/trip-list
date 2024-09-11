export default function Stats({ items }) {
    // If there are no items, display a prompt to add items
    if (!items.length)
        return (
            <footer className="stats">
                <em>Start by adding some items to your trip list!</em>
            </footer>
        );

    // Calculate the total number of items and packed items
    const numItems = items.length;
    const numPacked = items.filter((item) => item.packed).length;
    const percentage = Math.round((numPacked / numItems) * 100); // Calculate the percentage of packed items

    return (
        <footer className="stats">
            {percentage === 100 ? (
                // If all items are packed, display a congratulatory message
                <em>You got everithing packed! Ready to go ✈️</em>
            ) : (
                // Display the number of items, packed items, and the percentage of packed items
                <em>
                    You have {numItems} {numItems !== 1 ? "items" : "item"} on
                    your list - You packed {numPacked} ({percentage}%) 🧳
                </em>
            )}
        </footer>
    );
}

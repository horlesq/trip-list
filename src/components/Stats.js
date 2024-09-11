export default function Stats({ items }) {
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

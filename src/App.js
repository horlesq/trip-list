export default function App() {
    return (
        <div className="app">
            <Logo />
            <Form />
            <PackingList />
            <Stats />
        </div>
    );
}

function Logo() {
    return <h1>✈️ Trip List 🧳</h1>;
}

function Form() {
    return (
        <div className="add-form">
            <h3>What are you packing?</h3>
        </div>
    );
}

function PackingList() {
    return <div className="list">List</div>;
}

function Stats() {
    return (
        <footer className="stats">
            <em>You have X items on your list. You already packed x%</em>
        </footer>
    );
}

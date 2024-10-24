import { useEffect, useState } from 'react';
import './App.css';
import Register from './Register';
import Order from './Order';

function App() {
    const [pakiautomaadid, setPakiautomaadid] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://localhost:7188/parcelmachine")
            .then(res => res.json())
            .then(json => setPakiautomaadid(json));

        fetch("https://localhost:7188/api/products") // URL для получения продуктов
            .then(res => res.json())
            .then(json => setProducts(json));
    }, []);

    return (
        <div className="App">
            <h1>Parcel Machines</h1>
            <select>
                {pakiautomaadid.map(automaat =>
                    <option key={automaat.ID}>
                        {automaat.NAME}
                    </option>)}
            </select>

            <h2>Register</h2>
            <Register />

            <h2>Order Products</h2>
            <Order products={products} />
        </div>
    );
}

export default App;

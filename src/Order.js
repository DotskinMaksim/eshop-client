import { useState } from 'react';

function Order({ products }) {
    const [selectedProduct, setSelectedProduct] = useState('');

    const handleOrder = async (e) => {
        e.preventDefault();
        const response = await fetch("https://localhost:7188/orders/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId: selectedProduct }),
        });

        if (response.ok) {
            // handle successful order
            alert("Order placed successfully!");
        } else {
            // handle order error
            alert("Order failed.");
        }
    };

    return (
        <form onSubmit={handleOrder}>
            <select value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)} required>
                <option value="">Select a product</option>
                {products.map(product => (
                    <option key={product.id} value={product.id}>
                        {product.name}
                    </option>
                ))}
            </select>
            <button type="submit">Order</button>
        </form>
    );
}

export default Order;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ProductListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px;
`;

const ProductCard = styled.div`
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px;
  padding: 20px;
  width: 200px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const ProductName = styled.h3`
  font-size: 18px;
  margin: 10px 0;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  color: #4a90e2;
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 4px;
`;

const QuantitySelector = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const ProductList = ({ addToCart }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://localhost:7188/api/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                // Инициализируем количество для каждого продукта
                const initializedProducts = data.map(product => ({
                    ...product,
                    amount: 1 // Устанавливаем начальное количество
                }));
                setProducts(initializedProducts);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, []);

    const taxRate = 1.20; // 20% налог

    const updateAmount = (id, newAmount) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, amount: newAmount } : product
            )
        );
    };

    return (
        <ProductListContainer>
            {products.map((product) => (
                <ProductCard key={product.id}>
                    <ProductImage src={product.imageUrl} alt={product.name} />
                    <ProductName>{product.name}</ProductName>
                    <ProductPrice>
                        €{(product.price * taxRate).toFixed(2)} {product.pricePerKg ? "/kg" : ""}
                    </ProductPrice>
                    <QuantitySelector>
                        <button onClick={() => updateAmount(product.id, product.amount + 1)}>+</button>
                        <p>{product.amount}</p>
                        <button onClick={() => updateAmount(product.id, product.amount - 1 > 0 ? product.amount - 1 : 1)}>-</button>
                    </QuantitySelector>
                    <button onClick={() => addToCart({ ...product, quantity: product.amount })}>Добавить в корзину</button>
                </ProductCard>
            ))}
        </ProductListContainer>
    );
};

export default ProductList;

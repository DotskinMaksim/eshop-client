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
  margin: 15px;
  padding: 20px;
  width: 250px;
  text-align: center;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  }
`;

const ProductName = styled.h3`
  font-size: 18px;
  margin: 10px 0;
  font-weight: bold;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  color: #4a90e2;
  margin: 10px 0;
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 15px;
`;

const QuantitySelector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;

  input {
    width: 50px;
    text-align: center;
    margin: 0 10px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 5px 10px;
    border: 1px solid #ccc;
    background-color: #f4f4f4;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    margin: 0 5px;

    &:hover {
      background-color: #e0e0e0;
    }
  }
`;

const AddToCartButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 15px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 14px;
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  background: #f0fff0;
  padding: 5px 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [successMessages, setSuccessMessages] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://localhost:7188/api/products/withtax');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        const initializedProducts = data.map((product) => ({
          ...product,
          amount: 1,
        }));
        setProducts(initializedProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const updateAmount = (id, newAmount) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id && newAmount <= product.amountInStock
          ? { ...product, amount: newAmount }
          : product
      )
    );
  };

 const handleAddToCart = (product) => {
  let productAdd = { ...product };

  if (productAdd.hasBottle) {
    productAdd.pricePerUnit += 0.10;
  }

  addToCart({
    ...productAdd,
    quantity: productAdd.amount,
    price: productAdd.pricePerUnit,
  })
    .then(() => {
      // Если товар добавлен в корзину без ошибок, показываем сообщение
      setSuccessMessages((prevMessages) => ({
        ...prevMessages,
        [product.id]: true,
      }));

      setTimeout(() => {
        setSuccessMessages((prevMessages) => ({
          ...prevMessages,
          [product.id]: false,
        }));
      }, 2000);

      // Сброс количества к 1
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === product.id ? { ...p, amount: 1 } : p
        )
      );
    })
    .catch((errorMessage) => {
      // Если возникла ошибка (например, недостаточно товара на складе)
      alert(errorMessage);
    });
};

  return (
    <ProductListContainer>
      {products.map((product) => (
        <ProductCard key={product.id}>
          <ProductImage src={product.imageUrl} alt={product.name} />
          <ProductName>{product.name}</ProductName>
          <ProductPrice>
            €
            {(product.pricePerUnit )}
            {product.unit === 'kg' ? ' /kg' : ''}
            {product.hasBottle  ? ' + 0.10' : ''}
          </ProductPrice>
          <QuantitySelector>
            {product.unit === 'kg' ? (
              <>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={product.amount}
                  onChange={(e) =>
                    updateAmount(product.id, parseFloat(e.target.value))
                  }
                />
                <span>kg</span>
              </>
            ) : (
              <>
                <button
                  onClick={() =>
                    updateAmount(product.id, product.amount - 1 > 0 ? product.amount - 1 : 1)
                  }
                  disabled={product.amount <= 1}
                >
                  -
                </button>
                <p>{product.amount}</p>
                <button
                  onClick={() => updateAmount(product.id, product.amount + 1)}
                  disabled={product.amount >= product.amountInStock}
                >
                  +
                </button>
              </>
            )}
          </QuantitySelector>
          {successMessages[product.id] && (
            <SuccessMessage>Добавлено в корзину</SuccessMessage>
          )}
          <AddToCartButton onClick={() => handleAddToCart(product)}>Добавить в корзину</AddToCartButton>
        </ProductCard>
      ))}
    </ProductListContainer>
  );
};

export default ProductList;
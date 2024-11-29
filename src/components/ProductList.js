import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

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

  .slider {
    width: 100%;
    margin: 10px 0;
  }
`;
const CategorySelector = styled.select`
  padding: 5px;
  margin: 20px;
  font-size: 16px;
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
  const { t } = useTranslation();
  const API_URL = process.env.REACT_APP_API_URL;
  const [category, setCategory] = useState('');

   useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products/withtax?category=${category}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        const initializedProducts = data.map((product) => ({
          ...product,
          amount: product.unit === 'kg' ? 0.1 : 1,
        }));
        setProducts(initializedProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [category]);

  const updateAmount = (id, newAmount) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id && newAmount <= product.amountInStock && newAmount!==0
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

        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === product.id ? { ...p, amount: product.unit === 'kg' ? 0.1 : 1 } : p
          )
        );
      })
      .catch((errorMessage) => {
        alert(errorMessage);
      });
  };

  return (
      <div>

          <CategorySelector
              value={category}
              onChange={(e) => setCategory(e.target.value)}
          >
              <option value="">{t('all_categories')}</option>
              <option value="Juurviljad">{t('vegetables')}</option>
              <option value="Puuviljad">{t('fruits')}</option>
              <option value="Joogid">{t('drinks')}</option>
              <option value="Piimatoodet">{t('dairy')}</option>
              <option value="Snakid">{t('snacks')}</option>

          </CategorySelector>

          <ProductListContainer>
              {products.map((product) => (
                  <ProductCard key={product.id}>
                      <ProductImage src={product.imageUrl} alt={product.name}/>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>
                  €
                  {(product.pricePerUnit)}
                  {product.unit === 'kg' ? '/' + t('kg') : ''}
                  {product.hasBottle ? ' + 0.10' : ''}
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
                        <input
                            type="range"
                            min="0.1"
                            max={product.amountInStock}
                            step="0.1"
                            value={product.amount}
                            onChange={(e) =>
                                updateAmount(product.id, parseFloat(e.target.value))
                            }
                            className="slider"
                        />
                      </>
                  ) : (
                      <>
                        <button
                            onClick={() =>
                                updateAmount(product.id, Math.max(1, product.amount - 1))
                            }
                            disabled={product.amount <= 1}
                        >
                          -
                        </button>
                        <p>{product.amount}</p>
                        <button
                            onClick={() =>
                                updateAmount(product.id, product.amount + 1)
                            }
                            disabled={product.amount >= product.amountInStock}
                        >
                          +
                        </button>
                      </>
                  )}
                </QuantitySelector>
                {successMessages[product.id] && (
                    <SuccessMessage>{t('added_to_cart')}</SuccessMessage>
                )}
                <AddToCartButton onClick={() => handleAddToCart(product)}>{t('add_to_cart')}</AddToCartButton>
              </ProductCard>
          ))}
        </ProductListContainer>
      </div>

        );
        };

        export default ProductList;
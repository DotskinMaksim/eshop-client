import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const ProductListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px;
`;

const LoadMoreButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
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
  const [categories, setCategories] = useState([]);
  const [successMessages, setSuccessMessages] = useState({});
  const [category, setCategory] = useState('');
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [cache, setCache] = useState({}); // Cache for products by category
  const quantityToLoad = 10;
const { t, i18n } = useTranslation();
const API_URL = process.env.REACT_APP_API_URL;

  // Fetch categories from the backend
const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/products/categories?lang=${i18n.language}`);
    if (!response.ok) throw new Error('Не удалось получить категории');
    const data = await response.json();
    setCategories(data);  // Сохраняем категории в state
  } catch (error) {
    console.error(error);
  }
};
  // Fetch products by category
  const fetchProducts = async (append = false, currentOffset = 0, currentCategory = '') => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/products?offset=${currentOffset}&limit=${quantityToLoad}&withTax=true&withBottlePrice=true&category=${currentCategory}`
      );
      if (!response.ok) throw new Error('Failed to fetch products');

      const data = await response.json();
      const initializedProducts = data.map((product) => ({
        ...product,
        amount: product.unit === 'kg' ? 0.1 : 1,
      }));

      // Update cache
      setCache((prevCache) => ({
        ...prevCache,
        [currentCategory]: append
          ? [...(prevCache[currentCategory] || []), ...initializedProducts]
          : initializedProducts,
      }));

      setProducts((prevProducts) =>
        append ? [...prevProducts, ...initializedProducts] : initializedProducts
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

    useEffect(() => {
    fetchCategories();  // Загружаем категории при изменении языка
    }, [i18n.language]); // Зависимость от языка

  useEffect(() => {
    if (cache[category]) {
      setProducts(cache[category]);  // Load products from cache
    } else {
      fetchProducts(false, 0, category);  // Fetch products if not in cache
    }
    setOffset(0);  // Reset offset when category changes
  }, [category]);

  const updateAmount = (id, newAmount) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id && newAmount <= product.amountInStock && newAmount !== 0
          ? { ...product, amount: newAmount }
          : product
      )
    );
  };

  const handleAddToCart = (product) => {
    let productAdd = { ...product };

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
      {/* Category Selector */}
     <CategorySelector value={category} onChange={(e) => setCategory(e.target.value)}>
  <option value="">{t('all_categories')}</option>
  {categories.map((cat) => (
    <option key={cat.id} value={cat.nameEn}>
      {cat.name} {/* Отображаем название на выбранном языке */}
    </option>
  ))}
</CategorySelector>

      {/* Product List */}
      <ProductListContainer>
        {products.map((product) => (
          <ProductCard key={product.id}>
            <ProductImage src={product.imageUrl} alt={product.name} />
            <ProductName>{product.name}</ProductName>
            <ProductPrice>
              €
              {product.hasBottle
                ? (product.pricePerUnit - 0.10).toFixed(2)
                : product.pricePerUnit.toFixed(2)}
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
                    onChange={(e) => updateAmount(product.id, parseFloat(e.target.value))}
                  />
                  <input
                    type="range"
                    min="0.1"
                    max={product.amountInStock}
                    step="0.1"
                    value={product.amount}
                    onChange={(e) => updateAmount(product.id, parseFloat(e.target.value))}
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
                    onClick={() => updateAmount(product.id, product.amount + 1)}
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
            <AddToCartButton onClick={() => handleAddToCart(product)}>
              {t('add_to_cart')}
            </AddToCartButton>
          </ProductCard>
        ))}
      </ProductListContainer>
      {products.length % quantityToLoad === 0 && products.length !== 0 ? (
        <LoadMoreButton
          onClick={() => {
            const newOffset = offset + quantityToLoad;
            setOffset(newOffset);
            fetchProducts(true, newOffset, category);
          }}
          disabled={isLoading}
        >
          {isLoading ? t('loading') : t('load_more')}
        </LoadMoreButton>
      ) : null}
    </div>
  );
};

export default ProductList;
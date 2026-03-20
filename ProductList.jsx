import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
    const [showCart, setShowCart] = useState(false);
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    const plantsArray = [
        {
            category: "Air Purifying",
            plants: [
                { name: "Snake Plant", image: "https://via.placeholder.com/150", description: "Hardy and helps purify air.", cost: 15 },
                { name: "Spider Plant", image: "https://via.placeholder.com/150", description: "Great for removing toxins.", cost: 12 },
                { name: "Peace Lily", image: "https://via.placeholder.com/150", description: "Elegant white blooms.", cost: 20 },
                { name: "Aloe Vera", image: "https://via.placeholder.com/150", description: "Medicinal and air purifying.", cost: 10 },
                { name: "Rubber Plant", image: "https://via.placeholder.com/150", description: "Large, glossy leaves.", cost: 25 },
                { name: "Pothos", image: "https://via.placeholder.com/150", description: "Easy to grow vine.", cost: 8 }
            ]
        },
        {
            category: "Fragrant",
            plants: [
                { name: "Jasmine", image: "https://via.placeholder.com/150", description: "Sweet smelling flowers.", cost: 18 },
                { name: "Lavender", image: "https://via.placeholder.com/150", description: "Calming scent.", cost: 15 },
                { name: "Rosemary", image: "https://via.placeholder.com/150", description: "Fragrant herb.", cost: 12 },
                { name: "Mint", image: "https://via.placeholder.com/150", description: "Refreshing aroma.", cost: 7 },
                { name: "Lemon Balm", image: "https://via.placeholder.com/150", description: "Citrus scent.", cost: 10 },
                { name: "Hyacinth", image: "https://via.placeholder.com/150", description: "Strong floral fragrance.", cost: 14 }
            ]
        },
        {
            category: "Low Maintenance",
            plants: [
                { name: "ZZ Plant", image: "https://via.placeholder.com/150", description: "Thrives in low light.", cost: 30 },
                { name: "Cast Iron Plant", image: "https://via.placeholder.com/150", description: "Extremely durable.", cost: 28 },
                { name: "Jade Plant", image: "https://via.placeholder.com/150", description: "Succulent with thick leaves.", cost: 15 },
                { name: "Chinese Evergreen", image: "https://via.placeholder.com/150", description: "Very adaptable.", cost: 22 },
                { name: "Succulent Mix", image: "https://via.placeholder.com/150", description: "Requires little water.", cost: 12 },
                { name: "Dragon Tree", image: "https://via.placeholder.com/150", description: "Striking spiked leaves.", cost: 25 }
            ]
        }
    ];

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
    };

    const isPlantInCart = (plantName) => {
        return cartItems.some(item => item.name === plantName);
    };

    return (
        <div>
            <nav className="navbar">
                <div className="logo" onClick={() => setShowCart(false)}>Paradise Nursery</div>
                <ul className="nav-links">
                    <li onClick={() => setShowCart(false)}>Home</li>
                    <li onClick={() => setShowCart(false)}>Plants</li>
                    <li onClick={() => setShowCart(true)}>
                        Cart <span className="cart-count">({totalItems})</span>
                    </li>
                </ul>
            </nav>

            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((categoryObj, index) => (
                        <div key={index} className="category-section">
                            <h2>{categoryObj.category}</h2>
                            <div className="plants-list">
                                {categoryObj.plants.map((plant, idx) => (
                                    <div key={idx} className="plant-card">
                                        <img src={plant.image} alt={plant.name} />
                                        <h3>{plant.name}</h3>
                                        <p>${plant.cost}</p>
                                        <button 
                                            disabled={isPlantInCart(plant.name)}
                                            onClick={() => handleAddToCart(plant)}
                                        >
                                            {isPlantInCart(plant.name) ? "Added to Cart" : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={() => setShowCart(false)} />
            )}
        </div>
    );
}

export default ProductList;

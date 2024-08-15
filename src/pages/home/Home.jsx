import './Home.css'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../components/Product';

export function Home() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedCart = localStorage.getItem('cart');

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, [navigate]);

    useEffect(() => {
        if (cart.length) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]); 

    const products = [
        { id: 1, name: 'Protein Powder', src: 'protein_powder', description: 'Protein Powder', price: 50.00 },
        { id: 2, name: 'Creatine', src: 'creatine', description: 'Creatine', price: 20.00 },
        { id: 3, name: 'Mass Gainer', src: 'mass_gainer', description: 'Mass Gainer', price: 40.00 },
        { id: 4, name: 'BCAA', src: 'bcaa', description: 'BCAA', price: 20.00 },
        { id: 5, name: 'Pre Workout', src: 'pre_workout', description: 'Pre Workout', price: 30.00 },
        { id: 6, name: 'Beta Alanine', src: 'beta_a', description: 'Beta Alanine', price: 20.00 },
        { id: 7, name: 'Multi Vitamin', src: 'multi_v', description: 'Multi Vitamin', price: 15.00 },
        { id: 8, name: 'Protein Bar', src: 'protein_bar', description: 'Protein Bar', price: 5.00 },
    ]

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);
            if (existingProduct) {
              return prevCart.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
              );
            } else {
              return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const increaseQty = (product) => {
        setCart((prevCart) => 
            prevCart.map((item) => 
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    }

    const removeFromCart = (product) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== product.id))
    }

    const decreaseQty = (product) => {
        setCart((prevCart) => 
            prevCart.map((item) => 
                item.id === product.id ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
            )
        );
    }

    return (
        <>
            {user ? (
                <div>
                    <div className='welcome-user'>
                        <p>Welcome, {user.username}!</p>
                    </div>
                    <div className='cart-section'>
                        <h2>Your Cart</h2>
                        <div className='cart-table'>
                            <h3>Items</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product Details</th>
                                        <th>Quantity</th>
                                        <th>Total Cost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <img src={`/images/${item.src}.png`} alt="cart-image"></img>
                                            {item.name}
                                        </td>
                                        <td>
                                            {item.quantity}
                                            <button className='qty-button' onClick={() => increaseQty(item)}>+</button>
                                            <button className='qty-button' onClick={() => decreaseQty(item)}>-</button>
                                            {item.quantity === 0 && (
                                                <button className='qty-button' onClick={() => removeFromCart(item)}>X</button>
                                            )}
                                        </td>
                                        <td>${item.price * item.quantity}</td>
                                    </tr>
                                    ))}  
                                </tbody>
                                <tfoot>
                                        <tr>
                                            <td colSpan="3">${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</td>
                                        </tr>
                                    </tfoot>
                            </table>
                        </div>
                    </div>
                </div>           
            ) : (
                <div className='guest'>
                    <p>Not logged in</p>
                </div>
            )}

            <div className='products'>
                {products.map((product) => (
                    <div key={product.id} className='product-item'>
                        <Product key={product.id} product={product}></Product>
                        {user ? (
                            <button onClick={() => addToCart(product)} className='shopping-cart-btn'>
                                <img src="/images/shopping-cart.png" alt="Add to Cart" className='shopping-cart-img'></img>
                            </button>
                        ) : (
                            <button disabled className='shopping-cart-btn'>
                                <img src="/images/shopping-cart.png" alt="Add to Cart" />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {user && (
                <div className='logout-button'>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}

        </>
    );

    function handleLogout(){
        localStorage.removeItem('user');
        navigate('/login');
    }
}
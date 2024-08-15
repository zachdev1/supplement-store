import './Product.css'
import React, { useState } from 'react';

export function Product({ product }) {

    return (
        <>  
            <div className='grid-container'>
                <div className='grid-item'>
                    <img src={`/images/${product.src}.png`}></img>
                    <h3>{product.name}</h3>
                    {/* <p>{product.description}</p> */}
                    <p>${product.price.toFixed(2)}</p>
                </div>
            </div>
        </>
    );
}

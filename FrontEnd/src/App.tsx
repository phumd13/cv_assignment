import React, { useState, createContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import { ShoppingCartPanel } from './Cart/ShoppingCartPanel.tsx';
import { CheckoutForm } from './Checkout/CheckoutForm.tsx';
import { PaymentInterface } from './Payment/PaymentInterface.tsx';

export const ProductContext = createContext();

export const App = () => {

  const initialData = [
    {id: 0, name: 'Dog Food', body: "Best dog food for your fur baby!", quantity: 2, price: 20.00},
    {id: 1, name: 'FFXIV', body: "Have you heard of the critically acclaimed MMORPG?", quantity: 1, price: 60.00},
    {id: 2, name: 'Dog Toy', body: "Best dog toys for your fur baby!", quantity: 5, price: 10.00}
  ];

  const [data, setData] = useState(initialData);


  return (
    <div>
      <h1 className="my-4 text-center">Happy Coding!</h1>
      <ProductContext.Provider value={[data, setData]}>
        <Routes>
            <Route path="/" element={<Navigate replace to="cart" />} />
            <Route path="cart" element={<ShoppingCartPanel />}/>
            <Route path="checkout" element={<CheckoutForm />} />
            <Route path="payment" element={<PaymentInterface />} />
        </Routes>
      </ProductContext.Provider>
    </div>
  );
}

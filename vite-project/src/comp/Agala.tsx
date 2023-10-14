/* eslint @typescript-eslint/no-explicit-any: 0 */

import { useReducer } from "react";

type Item = {
    id: number;
    name: string;
    price: number;
    quantity: number;
};


const items: Item[] = [
    { id: 1, name: 'Laptop', price: 1200, quantity: 0 },
    { id: 2, name: 'Phone', price: 800, quantity: 0 },
    { id: 3, name: 'Tablet', price: 400, quantity: 0 },
];

const initialState: Item[] = [];

const reducer = (currentState: Item[], action: any) => {
    switch (action.type) {
        case "add":
            return [...currentState, action.item];
        case "remove":
            return currentState.filter((item) => item.id !== action.itemId);
        case "reset":
            return [];
        case "increment":
            return currentState.map((item) => {
                if (item.id === action.itemId) {
                    return { ...item, quantity: (item.quantity) + 1 };
                }
                return item;
            });
        case "decrement":
            return currentState.map((item) => {
                if (item.id === action.itemId && item.quantity > 0) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });
        default:
            return currentState;
    }
};

const ShoppingCart = () => {
    const [cart, dispatch] = useReducer(reducer, initialState);

    const addItemToCart = (item: Item) => {
        dispatch({ type: "add", item });
    };

    const removeItemFromCart = (itemId: number) => {
        dispatch({ type: "remove", itemId });
    };

    const resetCart = () => {
        dispatch({ type: "reset" });
    };
    const incrementQuantity = (itemId: number) => {
        dispatch({ type: "increment", itemId });
    };

    const decrementQuantity = (itemId: number) => {
        dispatch({ type: "decrement", itemId });
    };
    function add(item: any) {
        const itemInCart = cart.find((cartItem) => cartItem.id === item.id)
        if (!itemInCart) {
            addItemToCart(item);
        }
    }
    return (
        <div>
            <h2>Shopping Cart</h2>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        {item.name} - ${item.price}
                        <button onClick={() => add(item)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
            <h3>Cart Contents</h3>
            <ul>
                {cart.map((item) => (
                    <li key={item.id}>
                        {item.name} - ${item.price} - Quantity: {item.quantity || 1}
                        <button onClick={() => incrementQuantity(item.id)}>Add 1</button>
                        <button onClick={() => decrementQuantity(item.id)}>Remove 1</button>
                        <button onClick={() => removeItemFromCart(item.id)}>Remove Product</button>
                    </li>
                ))}
            </ul>
            <button onClick={resetCart}>Clear Cart</button>
        </div>
    );
};

export default ShoppingCart;

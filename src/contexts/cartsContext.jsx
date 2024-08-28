import { createContext } from "react";


import { useCart } from "../hooks/useCarts";
export const CartContext = createContext([]);

export const CartProvider = ({ children }) => {
	const cartResponse = useCart();

	return (
		<CartContext.Provider value={cartResponse}>
			{children}
		</CartContext.Provider>
	);
}
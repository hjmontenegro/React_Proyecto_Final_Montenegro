import { Children, createContext, useState } from "react";

export const ItemContext = createContext();

export const Provider = ({ children }) => {
    const [items, setItem] = useState();

    const addItem = (item) => {
        const alreadyExistS = items.some((i) => i.id === item.id);

        if(alreadyExistS) {
            const transform = item.map(i => {
                if(i.id === item.id) {
                    return { ...i, quantity: quantity + item.quantity} 
                } else {
                    return i;
                }
            });
            setItem(transform);
        } else {
            setItem((prev) => [...prev,item]);
        }

        
    };

    const reset = () => {
        setItem([]);S
    };

    return (
        <ItemContext.Provider value={{ items, addItem, reset }}>
            { children }
        </ItemContext.Provider>  
    );
};
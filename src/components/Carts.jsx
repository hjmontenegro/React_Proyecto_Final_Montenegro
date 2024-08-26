import { useContext, useState } from "react";

import { ItemContext } from "../contexts/ItemsContext";

import {
    getFirestore,
    collection,
    addDoc
}  from "firebase/firestore";

const initialValues = {
    phone:"",
    email: "",
    name: "",
};
export const Cart = () => {
    const [buyer, setBuyer] = useState(initialValues);

    const { items, reset } = useContext(ItemContext);
    const total = items.reduce((acc, act) => acc + act,price * act.quantity, 0);

    const handleChange = (event) => {
        setBuyer(prev => {
            return {...prev, [event.target.name] : event.target.value }
        });
    };

    const handleOrder = (event) => {
        const order = {
            buyer,
            items,
            total
        }
    }
    const db = getFirestore();
    const orderCollection = collection(db, "orders");

    addDoc(orderCollection, order).then(({id}) => {
        if(id) {
            alert(`Su orden: ${id} ha sido completada`);
            reset()
            setBuyer(initialValues)
        }
    });

    if(!items.length) return "No has elegido productos ";

    return (
        <>
            <button onClick={reset}>Reset</button>
            {items?.map((i) => (
                <div key={i.id}>
                    <h1>{i.title}</h1>
                    <img src={i.img} height={80} />

                    <h2>Cantidad: {i.quantity}</h2>
                    <h2>Precio: {i.price}</h2>
                </div>
            ))};
            <h4>Total: { total }</h4>
            <hr />
            !!items.length && 
            <form>
                <div>
                    <label>Nombre</label>
                    <input value={buyer.name} onChange={handleChange} name="name" />
                    
                </div>
                <div>
                    <label>Email</label>
                    <input  value={buyer.email} onChange={handleChange} name="email" />
                    
                </div>
                <div>
                    <label>Teléfono</label>
                    <input  value={buyer.phone} onChange={handleChange}  name="phone" />
                    
                </div>
                <button type="buttom" onClick={handleOrder}>Comprar</button>
            </form>
        </>
    );
};
import { useContext, useState } from "react";

import { CartContext } from "../contexts/cartsContext";

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

    const { productosAgregados, clear } = useContext(CartContext);
    
    console.log(productosAgregados)
    const total = productosAgregados.reduce((acc, act) => acc + act.precio * act.quantity, 0);

    const handleChange = (event) => {
        setBuyer(prev => {
            return {...prev, [event.target.name] : event.target.value }
        });
    };

    const handleOrder = (event) => {
        const order = {
            buyer,
            productosAgregados,
            total
        }
    
        const db = getFirestore();
        const orderCollection = collection(db, "orders");

        addDoc(orderCollection, handleOrder.order).then(({id}) => {
            if(id) {
                alert(`Su orden: ${id} ha sido completada`);
                clear()
                setBuyer(initialValues)
            }
        });
    }
    if(!productosAgregados.length) return "No has elegido productos ";

    return (
        <>
            <button onClick={ clear }>Reset</button>
            {productosAgregados?.map((i) => (
                <div key={i.id}>
                    <h1>{i.name}</h1>
                    <img src={i.img} height={80} />

                    <h2>Cantidad: {i.stock}</h2>
                    <h2>Precio: {i.precio}</h2>
                </div>
            ))};
            <h4>Total: { total }</h4>
            <hr />
            !!productosAgregados.length && 
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
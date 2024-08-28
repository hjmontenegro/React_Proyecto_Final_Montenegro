import { useContext, useState } from "react";
import { CartContext } from "../contexts/cartsContext";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

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
    
    const total = productosAgregados.reduce((acc, act) => acc + act.precio * act.quantity, 0);

    const handleChange = (event) => {
        setBuyer(prev => {
            return {...prev, [event.target.name] : event.target.value }
        });
    };

    const handleOrder = (event) => {
        event.preventDefault();

        
        const order = {
            buyer,
            productosAgregados,
            total
        };
        
        const errores = validate(buyer);

        if(errores.Texto != "") {
                
            alert(errores.Texto);

            return false;
        }

        const db = getFirestore();
        const orderCollection = collection(db, "orders");

        addDoc(orderCollection, order ).then(({id}) => {
            if(id) {
                alert(`Su orden: ${id} ha sido completada`);
                clear()
                setBuyer(initialValues)
            }
        });
    }

    function validate (values) {
        const errores = {};
        errores.Texto = "";

        if(values.email =="" || values.phone ==""|| values.name =="")
            errores.Texto = 'Todos los campos son obligatorio \n';
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errores.Texto += 'Invalid email address';
        }
      
        return errores;
      }

    if(!productosAgregados.length) return "No has elegido productos ";

    return (
        <>
        <Container className="mt-4">
            <button variant="primary" type="buttom" onClick={ clear }>Reset</button>
            {productosAgregados?.map((i) => (
                <div key={i.id}>
                    <h1>{i.name}</h1>
                    <img src={i.img} height={80} />

                    <p>Cantidad: {i.quantity}</p>
                    <p>Precio: {i.precio}</p>
                </div>
            ))}

            <h2>Total: { total }</h2>
            <hr />

            <Form  className="mt-4">
            <Form.Group className="mb-3" controlId="formBasicNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Nombre" onChange={handleChange} name="name" value={buyer.name} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={handleChange} name="email" value={buyer.email} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicTelefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control type="text" placeholder="Teléfono"  onChange={handleChange} name="phone" value={buyer.phone} />
            </Form.Group>

            <Button variant="primary" type="buttom" onClick={handleOrder}>
                Submit
            </Button>
            </Form>
        </Container>
        </>
    );
};
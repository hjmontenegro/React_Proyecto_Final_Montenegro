import { useEffect, useState } from "react";
import { json, Link, useParams } from "react-router-dom";
import { getFirestore, getDoc, doc } from "firebase/firestore";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { ItemCount } from "./ItemCount";
import { isAccordionItemSelected } from "react-bootstrap/esm/AccordionContext";

export const ItemDetailContainer = () => {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const db = getFirestore();

        const refDoc = doc(db, "items", id);

        getDoc(refDoc)
        .then((snapshot => {
            console.log(id)
            setItem( { id: snapshot.id, ...snapshot.data() } )
        }))
        .finally(() => setLoading(false))
    }, [id]);

    const onAdd = (count) => {
        addItem({...item, quantity : count})
    };

    if(loading) return <Container className="mt-4"><h1>Producto</h1>Wait....</Container>;
    if(!item) return <Container className="mt-4"><h1>Producto</h1>Producto no encontrado</Container>;

    return (
        <Container className="mt-4">
            <h1>Productos</h1>

            <Container className="d-flex">
                <div>
                    <h2>{item.name}</h2>
                    <img src={item.img} width={200} />
                    <p>{item.category} {item.sub_category}  Genero: { ((item.genero == "m")? "Mujer":"Hombre") }</p>
                    <h4>{item.detail}</h4>

                    <ItemCount stock={item.stock} onAdd={onAdd} />
                </div>
            </Container>
        </Container>
    );
};
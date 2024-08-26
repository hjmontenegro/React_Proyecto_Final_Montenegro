import { useEffect, useState } from "react";
import { json, Link, useParams } from "react-router-dom";
import { getFirestore, getDocs, collection, query, where } from "firebase/firestore";
//query, where
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const ItemListContainer = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { idcategoria } = useParams();

    useEffect(() => {
        let refCollection;
        const db = getFirestore();
        if(!idcategoria)
        {
            refCollection = collection(db, "items");
        } else {
            const idCategoriaSplit = idcategoria.split('_');

            refCollection  = query(
                collection(db, "items"),
                where('category', '==', idCategoriaSplit[0].toString()),
                where('sub_category', '==', idCategoriaSplit[1].toString()),
                where('genero', '==', ((idCategoriaSplit[2].toString() === 'mujer')? 'm' : 'h')),
            );

        }

        getDocs(refCollection)
        .then((snapshot) => {
            setItems( snapshot.docs.map((doc) => {
               return  { id: doc.id, ...doc.data() };
            }));
        })
        .finally(() => setLoading(false));

    }, [idcategoria]);

    if(loading) return <Container className="mt-4"><h1>Productos</h1>Wait....</Container>;
    if(items.length === 0) return <Container className="mt-4"><h1>Productos</h1>No hay Productos</Container>;
    
    return (
        <Container className="mt-4">
            <h1>Productos</h1>

            <Container className="d-flex">
            {items.map((i) => (
                <Card key={i.id} style={{ width: 300, marginLeft: 10 }}>
                    <Card.Img variant="top" src={i.img} width={200} />
                    <Card.Body>
                        <Card.Title>{i.name}</Card.Title>
                        <Card.Text>{i.detail}</Card.Text>
                        <Card.Text>{i.category} {i.sub_category} </Card.Text>
                        <Card.Text>Genero: { ((i.genero == "m")? "Mujer":"Hombre") }</Card.Text>
                        <Link to={`/item/${i.id}`}><Button variant="primary">Ver</Button></Link>
                    </Card.Body>
                </Card>
            ))}

            </Container>
        </Container>
    );
};
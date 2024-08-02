import { useEffect, useState } from "react";
import { json, Link, useParams } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import data from '../data/products.json';

export const ItemListContainer = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        new Promise((resolve, reject) => {
            setTimeout(/*() => */resolve(data), 2000);
        })
        .then((response) => {
            if(!id) {
                setItems( response )
            } else {
                const filtered = response.filter( i => i.category === id);
                setItems( filtered )
            }
        })
        .finally(() => setLoading(false));
    }, [id]);

    if(loading) return <Container className="mt-4"><h1>Productos</h1>Wait....</Container>;
    if(items.length === 0) return <Container className="mt-4"><h1>Productos</h1>No hay Productos</Container>;
    
    return (
        <Container className="mt-4">
            <h1>Productos</h1>

            <Container className="d-flex">
            {items.map((i) => (
                <Card key={i.id} style={{ width: 300 }}>
                    <Card.Img variant="top" src={i.img} height={200} />
                    <Card.Body>
                        <Card.Title>{i.name}</Card.Title>
                        <Card.Text>{i.detail}</Card.Text>
                        <Card.Text>{i.category}</Card.Text>
                        <Link to={`/item/${i.id}`}><Button variant="primary">Ver</Button></Link>
                    </Card.Body>
                </Card>
            ))};
            </Container>
        </Container>
    );
};
import { Container } from "react-bootstrap";

export const ItemListContainer = ({greeting}) => (
    <Container className="mt-4">
        <h1>{greeting}</h1>
    </Container>
);
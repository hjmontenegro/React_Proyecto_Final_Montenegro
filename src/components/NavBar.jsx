import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { CartWidget } from "./CartWidget";

export const NavBar = () => (
    <>
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
            <Navbar.Brand href="#home">Dog Shop</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="#">Buenos</Nav.Link>
                <Nav.Link href="#">Malos</Nav.Link>
                <Nav.Link href="#">Lindos</Nav.Link>
            </Nav>
            <CartWidget />
        </Container>
    </Navbar>
    
    </>
);

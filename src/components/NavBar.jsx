import { CartWidget } from "./CartWidget";

export const NavBar = () => (
    <>
        <h6>Dogs Shop</h6>
        <ul>
            <li><a href="#">Buenos</a></li>
            <li><a href="#">Malos</a></li>
            <li><a href="#">Lindos</a></li>
        </ul>
        <CartWidget />
    </>
);

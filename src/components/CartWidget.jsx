import { useContext } from 'react';
import { CartContext }  from '../contexts/cartsContext';
import { json, Link, useParams } from "react-router-dom";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

export const CartWidget = () => {
	const { productosAgregados, clear } = useContext(CartContext);
	const totalQuantity = () => productosAgregados.reduce((acumulador, valorActual) => acumulador + valorActual.quantity, 0);
    
	return (
		!!totalQuantity && (
		<div>

			<div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to='/' className="nav-link active">Compras</Link>
                        </li>
                    </ul>
                    <Link to='/cart'>
                        <Badge color="secondary">
							<img src="../src/assets/carrito.png" alt="Changuito" width={25} />
							<span color="black">{totalQuantity()}</span>
                        </Badge>
                    </Link>
                </div>
		</div>
			
		)
	)
}
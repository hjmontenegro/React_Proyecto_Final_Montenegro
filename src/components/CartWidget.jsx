import { useContext } from 'react';
import { CartContext }  from '../contexts/cartsContext';
import { json, Link, useParams } from "react-router-dom";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

export const CartWidget = () => {
	const { productosAgregados, clear } = useContext(CartContext);

	const totalQuantity = () => productosAgregados.reduce((acumulador, valorActual) => acumulador + valorActual.quantity,0);
    
	console.log(productosAgregados)
	return (
		!!totalQuantity && (
		<div>
			<Badge bg="info">
				<img src="../src/assets/carrito.png" alt="Changuito" width={25} />
				<span>{totalQuantity}</span>
			</Badge>
			<Link to="/cart">
				<Button>Terminar mi compra</Button>
			</Link>
		</div>
			
		)
	)
}
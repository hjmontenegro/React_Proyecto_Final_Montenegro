import { CartContext }  from '../contexts/cartsContext';
import { useContext } from 'react';

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

export const CartWidget = () => {
	const { productosAgregados } = useContext(CartContext)

	//const totalQuantity = () => productosAgregados.reduce((acumulador, valorActual) => acumulador + valorActual.quantity,0);
    const totalQuantity = 0;
	return (
		!!totalQuantity && (
			<Link to="/cart">
				<Badge bg="info">
					<img src="" alt="Changuito" />
					<span style={styles.span}>{totalQuantity}</span>
				</Badge>
				<Button>Terminar mi compra</Button>
			</Link>
		)
	)
}
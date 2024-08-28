import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { ItemListContainer } from "./components/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer";
import { CartProvider } from './contexts/cartsContext';
import { Cart } from "./components/Carts";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar />
          
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/category/:idcategoria" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={404} />
        </Routes>
        
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/NavBar'
import { ItemListContainer } from "./components/ItemListContainer"
import { ItemDetailContainer } from "./components/ItemDetailContainer"

function App() {
  return (
    <BrowserRouter>
      <NavBar />
        
      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/category/:id" element={<ItemListContainer />} />
        <Route path="/item/:id" element={<ItemDetailContainer />} />
        <Route path="*" element={404} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;

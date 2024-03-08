import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Admin/Dashboard';
import Category from './Pages/Admin/Category/Category';
import Product from './Pages/Admin/Product/Product';
import Add from './Pages/Admin/Category/Add';
import AddProduct from './Pages/Admin/Product/AddProduct';
import Home from './Pages/User/Home';
import Products from './Pages/User/Products';
import Cart from './Pages/User/Cart';
import ProductDetails from './Pages/Admin/Product/ProductDetails';
import UserDetails from './Pages/Admin/UserDetails';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/admin/dashboard' element={<Dashboard/>}/>
          <Route path='/admin/category' element={<Category/>}/>
          <Route path='/admin/product' element={<Product/>}/>
          <Route path='/admin/add' element={<Add/>}/>
          <Route path='/admin/addproduct' element={<AddProduct/>}/>
          <Route path='/admin/userdetails/:id' element={<UserDetails/>}/>
          



          {/* users */}

          
          <Route path='user/home' element={<Home/>}/>
          <Route path='user/products' element={<Products/>}/>
          <Route path='user/carts' element={<Cart/>}/>
          <Route path='/productdetails/:id' element={<ProductDetails/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;


import './App.css';
import Footer from './Components/layouts/Footer';
import Header from './Components/layouts/Header';
import Home from './Components/layouts/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {HelmetProvider} from 'react-helmet-async'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ViewProduct from './Components/product/ViewProduct';
import SearchProduct from './Components/product/SearchProduct';
import Login from './Components/user/Login';
import Register from './Components/user/Register';
import { useEffect, useState } from 'react';
import store from './store';
import { loadUser } from './actions/userActions';
import Profile from './Components/user/Profile';
import ProtectedRoute from './Components/route/ProtectedRoute';
import UpdateProfile from './Components/user/UpdateProfile';
import UpdatePassword from './Components/user/UpdatePassword';
import ForgotPassword from './Components/user/ForgotPassword';
import ResetPassword from './Components/user/ResetPassword';
import Cart from './Components/cart/Cart';
import Shipping from './Components/cart/Shipping';
import ConfirmOrder from './Components/cart/ConfirmOrder';
import Payment from './Components/cart/Payment';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './Components/cart/OrderSuccess';
import UserOrders from './Components/order/UserOrders';
import OrderDetail from './Components/order/OrderDetail';
import Dashboard from './Components/admin/Dashboard';
import ProductList from './Components/admin/ProductList';
import NewProduct from './Components/admin/NewProduct';
import UpdateProduct from './Components/admin/UpdateProduct';
import OrderList from './Components/admin/OrderList';
import UpdateOrder from './Components/admin/UpdateOrder';
import UserList from './Components/admin/UserList';
import UpdateUser from './Components/admin/UpdateUser';
import ReviewList from './Components/admin/ReviewList';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("")
   useEffect(()=>{
     store.dispatch(loadUser)
      async function getStripeApiKey(){
      const {data} = await axios.get('/api/v1/stripeapi')
      setStripeApiKey(data.stripeApiKey)
    }
    getStripeApiKey()
   },[])

  return (
    <Router> 
    <div className="App">
      <HelmetProvider> 
        <Header/>
             <div className='container container-fluid'>
                <ToastContainer theme='dark'/>
                  <Routes>  
                      < Route path='/' element={<Home/>} />
                      < Route path='/search/:keyword' element={<SearchProduct/>} />
                      <Route path='/product/:id' element={<ViewProduct/>} />
                      <Route path='/login' element={<Login/>} />
                      <Route path='/register' element={<Register/>} />
                      <Route path='/myprofile' element={<ProtectedRoute> <Profile/></ProtectedRoute>} />
                      <Route path='/myprofile/update' element={<ProtectedRoute> <UpdateProfile/></ProtectedRoute>} />
                      <Route path='/myprofile/update/password' element={<ProtectedRoute> <UpdatePassword/></ProtectedRoute>} />
                      <Route path='/password/forgot' element={ <ForgotPassword/>} />
                      <Route path='/password/reset/:token' element={ <ResetPassword/>} />
                      <Route path='/cart' element={ <Cart/>} />
                      <Route path='/shipping' element={ <ProtectedRoute><Shipping/></ProtectedRoute>} />
                      <Route path='/order/confirm' element={ <ProtectedRoute><ConfirmOrder/></ProtectedRoute>} />
                      <Route path='/order/success' element={ <ProtectedRoute><OrderSuccess/></ProtectedRoute>} />
                      <Route path='/orders' element={<ProtectedRoute><UserOrders/></ProtectedRoute> } />
                      <Route path='/order/:id' element={<ProtectedRoute><OrderDetail/></ProtectedRoute> } />
                      {stripeApiKey &&<Route path='/payment' element={<ProtectedRoute><Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements></ProtectedRoute> } />
                     }
                 </Routes>
              </div>
              <Routes>
              < Route path='/admin/dashboard' element={<ProtectedRoute isAdmin={true}><Dashboard/></ProtectedRoute>} />
              < Route path='/admin/products' element={<ProtectedRoute isAdmin={true}><ProductList/></ProtectedRoute>} />
              < Route path='/admin/products/create' element={<ProtectedRoute isAdmin={true}><NewProduct/></ProtectedRoute>} />
              < Route path='/admin/product/:id' element={<ProtectedRoute isAdmin={true}><UpdateProduct/></ProtectedRoute>} />
              < Route path='/admin/orders' element={<ProtectedRoute isAdmin={true}><OrderList/></ProtectedRoute>} />
              < Route path='/admin/order/:id' element={<ProtectedRoute isAdmin={true}><UpdateOrder/></ProtectedRoute>} />
              < Route path='/admin/users' element={<ProtectedRoute isAdmin={true}><UserList/></ProtectedRoute>} />
              < Route path='/admin/user/:id' element={<ProtectedRoute isAdmin={true}><UpdateUser/></ProtectedRoute>} />
              <Route path='/admin/reviews' element={ <ProtectedRoute isAdmin={true}><ReviewList/></ProtectedRoute> } />
              </Routes>
        <Footer/>
     </HelmetProvider>
    </div>
    </Router>
  );
}

export default App;

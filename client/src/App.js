
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import React,{useEffect} from 'react'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/Home'
import Header from './components/nav/Header'
import SideDrawer from './components/drawer/SideDrawer.js';


import RegisterComplete from './pages/auth/RegisterComplete'
import ForgotPassword from './pages/auth/ForgotPassword'
import { currentUser } from './functions/auth'
import History from './pages/user/History'
import UserRoute from './components/routes/UserRoute';
import Password from './pages/user/Password'
import AdminRoute from './components/routes/AdminRoute';
import CategoryCreate from './pages/admin/category/CategoryCreate.js'
import CategoryUpdate from './pages/admin/category/CategoryUpdate'
import SubCreate from './pages/admin/sub/SubCreate'
import SubUpdate from './pages/admin/sub/SubUpdate'
import ProductCreate from './pages/admin/product/ProductCreate'
import AllProducts from './pages/admin/product/AllProducts'
import ProductUpdate from './pages/admin/product/ProductUpdate'

import CategoryHome from './pages/category/CategoryHome.js'
import SubHome from './pages/sub/SubHome.js';
import Shop from './pages/shop.js';
import Cart from './pages/Cart.js';
import Checkout from './pages/Checkout.js'
import CreateCouponPage from './pages/admin/coupon/CreateCoupon.js';
import Payment from './pages/Payment.js';
import Wishlist from './pages/user/Wishlist';
import AdminDashboard from './pages/admin/AdminDashboard';
import Product from './pages/product.js';



import {auth} from './firebase'
import {useDispatch} from 'react-redux'
const App=()=>{
  const dispatch=useDispatch()
  
  useEffect(()=>{
    const unsubscribe=auth.onAuthStateChanged(async (user)=>{
      if(user){
        const idTokenResult=await user.getIdTokenResult()
        console.log("user",user);
  
        currentUser(idTokenResult.token).then(
          (res)=>{
            dispatch({
              type: 'LOGGED_IN_USER',
              payload:{
                name:res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              }
          });
          
          }).catch((err)=>console.log(err));
      }
    });
    //cleanup
    return ()=>unsubscribe();
  },[])
  return (
    <>
    {/* HIIIIIIII */}
    <Header/> 
    <SideDrawer/>
    <ToastContainer />
    <Routes>
          <Route exact path="/" element={<Home/>}/> 
          <Route exact path="/login" element={<Login/>}/> 
          <Route exact path="/register" element={<Register/>}/> 
          <Route exact path="/register/complete" element={<RegisterComplete/>}/> 
          <Route exact path="/forgot/password" element={<ForgotPassword/>}/> 
          
          {/* <Route element={<UserRoute/>}>
            <Route exact path="/user/history" element={<History />}/>
           </Route> */}

  
  <Route 
    path="/user/history" 
    element={
      <UserRoute>
        <History />
      </UserRoute>
    } 
  />
  <Route 
    path="/user/password" 
    element={
      <UserRoute>
        <Password />
      </UserRoute>
    } 
  />
  <Route 
    path="/user/wishlist" 
    element={
      <UserRoute>
        <Wishlist />
      </UserRoute>
    } 
  />


 
  <Route 
    path="/admin/dashboard" 
    element={
      < AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    } 
  />
  <Route 
    path="/admin/category" 
    element={
      < AdminRoute>
        <CategoryCreate />
      </AdminRoute>
    } 
  />
  <Route 
    path="/admin/category/:slug" 
    element={
      < AdminRoute>
        <CategoryUpdate/>
      </AdminRoute>
    } 
  />
    <Route 
    path="/admin/sub" 
    element={
      < AdminRoute>
      <SubCreate />
      </AdminRoute>
    } 
  />
    <Route 
    path="/admin/sub/:slug" 
    element={
      < AdminRoute>
        <SubUpdate />
      </AdminRoute>
    } 
  />

<Route 
    path="/admin/product" 
    element={
      < AdminRoute>
      <ProductCreate />
      </AdminRoute>
    } 
  />
<Route 
    path="/admin/products" 
    element={
      <AdminRoute>
      <AllProducts />
      </AdminRoute>
    } 
  />
  <Route 
    path="/admin/product/:slug"
    element={
      <AdminRoute>
        <ProductUpdate />
      </AdminRoute>
    } 
  />
  <Route exact path="/product/:slug" element={<Product/>}/>
  <Route exact path="/category/:slug" element={<CategoryHome/>}/>
  <Route exact path="/sub/:slug" element={<SubHome/>}/>
  <Route exact path="/shop" element={<Shop/>}/>
  <Route exact path="/cart" element={<Cart/>}/>

  <Route 
    path="checkout" 
    element={
      <UserRoute>
  <Checkout/>
      </UserRoute>
    } 
  />
  <Route 
    path="payment" 
    element={
      <UserRoute>
  <Payment/>
      </UserRoute>
    } 
  />
    <Route 
    path="/admin/coupon"
    element={
      <AdminRoute>
      <CreateCouponPage />
      </AdminRoute>
    } 
  />

  
</Routes>

</>
    
  );
};

export default App;
<Route exact path="/payment" element={<Payment/>}/>
import HeaderBar from "./header/headerBar";
import CartItem from "./cartitem/cartItem";
import NoElement from "./error/NoElement";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Detailed from "./Home/ItemDetails/Detailed";
import { useState, useEffect } from "react";
import { commerce } from "./data/commerce";
import CheckOut from "./cartitem/checkout/checkout";
import { useDispatch } from "react-redux";
import {fetchDatas} from "../store/store"
import { fetchActionCreator } from "../store/productsList";
import { actions } from "../store/store";

function App() {
  
  
  const dispatch = useDispatch()



  const [order,setOrder] = useState(null)
  let [products, upproducts] = useState([]);
  let [cart, setCart] = useState({});
  let [loading,setLoading] = useState(true)

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    localStorage.setItem("products",JSON.stringify(data))
    let d = JSON.parse(localStorage.getItem("products"))
    upproducts(d);
    setLoading(!loading)
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productID, quantity) => {
    setCart( await commerce.cart.add(productID, quantity))
  
  };

  const handleUpdateCart = async (productId, quantity ) => {
    setCart(
    await commerce.cart.update(productId, { quantity })
    );

  };

  const removefromCart = async (productId) => {
    setCart(
    await commerce.cart.remove(productId)
    )
  };

  const emptyCart = async ()=>{
    setCart(
      await commerce.cart.empty()
    )
  }
  
  const refreshCart = async()=>{
    const newCart = await commerce.cart.refresh()
    setCart(newCart)
    dispatch(actions.cartRefreshed({
      data:0
    }))
  }


  const handleCaptureCheckout = async(checkoutToken,newOrder) =>{
    try{
     const incomingOrder = await commerce.checkout.capture(checkoutToken,newOrder);
     setOrder(incomingOrder)
     refreshCart()
    }catch(error){
          console.log(error)
     }
  }

  useEffect(() => {
    setLoading(!loading)
    fetchProducts();
    fetchCart();
    dispatch(fetchDatas())
    dispatch(fetchActionCreator())
  }, []);

  return (
    <div>
      <BrowserRouter>
        <HeaderBar cart={cart} products={products}/>
        <Routes>
          <Route path="/" element={<Home products={products}  addtocart={handleAddToCart}  />} />
          <Route path="items" exact element={<CartItem cart={cart} removefromcart={removefromCart} updatecart={handleUpdateCart} emptycart={emptyCart}/>} />
          <Route path="*" element={<NoElement />} />
          <Route path="Details/:id" element={<Detailed addtocart={handleAddToCart}/>} />
          <Route path="items/checkout"  element={<CheckOut cart={cart} handleCaptureCheckout={handleCaptureCheckout} order={order} emptyCart={emptyCart}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

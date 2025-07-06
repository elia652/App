import { createContext } from "react";
import { useEffect,useState } from "react";
import { fetchCategories } from "../service/CategoryService";
import { fetchItems } from "../service/ItemService";
export const AppContext = createContext(null);
export const AppContextProvider = (props) => {

const[categories,setCategories] = useState([]);
const[itemData,setItemsData] = useState([]);
const[auth,setAuth]=useState({token:null,role:null});
const[cartItems,setCartItems]=useState([]);

const addToCart=(item)=>{
    const existingItem=
    cartItems.find(CartItem=>CartItem.name===item.name);
    if(existingItem){
        setCartItems(cartItems.map(CartItem=>CartItem.name===item.name ? {...CartItem,quantity:CartItem.quantity +1}:CartItem))
    }else{
        setCartItems([...cartItems,{...item,quantity:1}])
    }
}
const clearCart=()=>{
    setCartItems([]);
}
const removeFromCart=(itemId)=>{
    setCartItems(cartItems.filter(item=>item.itemId !== itemId));
}
const updateQuantity=(itemId,newQuantity)=>{
    setCartItems(cartItems.map(item=>item.itemId === itemId ?{...item,quantity:newQuantity}:item));
}
    useEffect(()=>{
        async function loadData(){
            if(localStorage.getItem("token") && localStorage.getItem("role")){
                setAuthData(
                    localStorage.getItem("token"),
                    localStorage.getItem("role")

    )}
            const response=await fetchCategories();
            const item=await fetchItems();
            setCategories(response.data);
            setItemsData(item.data);
        }loadData();
    },[])

    const setAuthData=(token,role)=>{
        setAuth({token,role});
    }
    const contextValue = {
       categories,
       setCategories,
       auth,
       setAuthData,
       itemData,
       setItemsData,
       addToCart,
       cartItems,
       updateQuantity,
       removeFromCart,
       clearCart
    };
    return(
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    )
}
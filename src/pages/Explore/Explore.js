import './Explore.css';
import { AppContext } from '../../context/AppContext';
import  { useContext, useState } from 'react';
import DisplayItems from '../../Components/DisplayItems/DisplayItems';
import CartItems from '../../Components/CartItems/CartItems';
import CartSummary from '../../Components/CartSummary/CartSummary';
import CustomerForm from '../../Components/CustomerForm/CustomerForm';
import DisplayCategory from '../../Components/DisplayCategory/DisplayCategory';
function Explore() {
      const {categories}= useContext(AppContext);
      const[selectedCategory,setselectedCategory]=useState("");
      const[customerName,setCustomerName]=useState('');
      const[mobileNumber,setMobileNumber]=useState('');
   return (
    <div className="explore-container text-light">
      <div className="left-column">
        <div className="first-row" style={{overflowY: "auto"}}>
         <DisplayCategory 
         selectedCategory={selectedCategory}
         setselectedCategory={setselectedCategory}
         categories={categories}/>
        </div>
      
      <hr className="horizontal-line" />
      <div className="second-row"style={{overflowY: "auto"}}>
       <DisplayItems selectedCategory={selectedCategory}/>
      </div>
      </div>
      <div className="right-column d-flex flex-column">
        <div className="customer-form-container" style={{height:'15%'}}>
        <CustomerForm
        mobileNumber={mobileNumber}
        customerName={customerName}
        setCustomerName={setCustomerName}
        setMobileNumber={setMobileNumber}
        />
        </div>
      <hr className="my-3 text-light" />
      <div className="cart-items-container" style={{height:'55%',overflowY: "auto"}}>
       <CartItems/>
      </div>
     <div className="cart-summary-container" style={{height:'30%',fontSize:"14px"}}>
      <CartSummary
       mobileNumber={mobileNumber}
        customerName={customerName}
        setCustomerName={setCustomerName}
        setMobileNumber={setMobileNumber}
        />
     </div>
    </div>
    </div>
    
  )
}

export default Explore

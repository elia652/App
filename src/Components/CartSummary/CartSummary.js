import { useContext, useRef, useState } from 'react';
import './CartSummary.css';
import { AppContext } from '../../context/AppContext';
import { createOrders, deleteOrders } from '../../service/OrderService';
import toast from 'react-hot-toast';
import ReceiptPopup from '../ReceiptPopup/ReceiptPopup';

function CartSummary({ mobileNumber, customerName, setCustomerName, setMobileNumber }) {
  const { cartItems, clearCart } = useContext(AppContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const receiptRef = useRef(null);

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = totalAmount * 0.01;
  const grandTotal = totalAmount + tax;

  const clearAll = () => {
    setCustomerName('');
    setMobileNumber('');
    clearCart();
  };

  const handlePrintReceipt = () => {
    setTimeout(() => {
      window.print();
    }, 500); // slight delay ensures the receipt renders before printing
  };

  const placeOrder = () => {
    if (!orderDetails) {
      toast.error("No order to print");
      return;
    }
    handlePrintReceipt();
    clearAll();
  };

  const completePayment = async (paymentMode) => {
    if (!customerName || !mobileNumber) {
      toast.error("Please enter customer details");
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const orderData = {
      customerName,
      phoneNumber: mobileNumber,
      cartItems,
      subtotal: totalAmount,
      tax,
      grandTotal,
      paymentMethod: paymentMode.toUpperCase(),
    };

    setIsProcessing(true);
    try {
      const response = await createOrders(orderData);
      if (response.status === 201 && paymentMode.toLowerCase() === 'cash') {
        toast.success("Cash received");
        setOrderDetails(response.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className='mt-2'>
      <div className='cart-summary-details'>
        <div className='d-flex jusitfy-content-between mb-2'>
          <span className='text-light'>Item:</span>
          <span className='text-light'>${totalAmount.toFixed(2)}</span>
        </div>
        <div className='d-flex jusitfy-content-between mb-2'>
          <span className='text-light'>Tax(1%):</span>
          <span className='text-light'>${tax.toFixed(2)}</span>
        </div>
        <div className='d-flex jusitfy-content-between mb-4'>
          <span className='text-light'>Total:</span>
          <span className='text-light'>${grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className='d-flex gap-1'>
        <button
          className='btn btn-primary flex-grow-1'
          onClick={() => completePayment("Cash")}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing" : "Cash"}
        </button>

        <button
          className='btn btn-warning flex-grow-1'
          onClick={placeOrder}
          disabled={isProcessing || !orderDetails}
        >
          Place Order
        </button>
      </div>

      <ReceiptPopup
  ref={receiptRef}
  orderDetails={orderDetails}
  onClose={() => setOrderDetails(null)}
  onPrint={handlePrintReceipt}
/>

    </div>
  );
}

export default CartSummary;

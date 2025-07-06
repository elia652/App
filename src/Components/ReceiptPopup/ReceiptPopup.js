import React, { forwardRef } from 'react';
import './ReceiptPopup.css';

const ReceiptPopup = forwardRef(({ orderDetails, onClose, onPrint }, ref) => {
  if (!orderDetails) return null;

  const {
    customerName,
    phoneNumber,
    cartItems = [],
    subtotal,
    tax,
    grandTotal,
    paymentMethod,
  } = orderDetails;

  return (
    <div className="popup-overlay">
      <div className="popup-content" ref={ref}>
        <h2 className="text-center mb-2">Receipt</h2>
        <hr />
        <div>
          <p><strong>Customer:</strong> {customerName}</p>
          <p><strong>Phone:</strong> {phoneNumber}</p>
          <p><strong>Payment:</strong> {paymentMethod}</p>
        </div>

        <table className="receipt-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="receipt-summary mt-3">
          <div className="summary-row"><span>Subtotal:</span><span>${subtotal?.toFixed(2)}</span></div>
          <div className="summary-row"><span>Tax (1%):</span><span>${tax?.toFixed(2)}</span></div>
          <div className="summary-row total"><span>Total:</span><span>${grandTotal?.toFixed(2)}</span></div>
        </div>

        <div className="popup-actions mt-4">
          <button className="btn btn-success me-2" onClick={onPrint}>Print</button>
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
});

export default ReceiptPopup;

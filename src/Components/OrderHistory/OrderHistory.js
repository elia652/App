import { useEffect, useState } from 'react';
import './OrderHistory.css';
import { latestOrders } from '../../service/OrderService';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await latestOrders();
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const formatItems = (items) => {
    return items.map((item) => `${item.name} x${item.quantity}`);
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (orders.length === 0) {
    return <div className='text-center py-4'>No orders found.</div>;
  }
const status=(method)=>{
  if(method === 'CASH'){
    return <span className='badge bg-warning text-dark'>Paid</span>
}}
  return (
    <div className='orders-history-container'>
      <h2 className='mb-2 text-light'>Recent Orders</h2>
      <div className='table-responsive'>
        <table className='table table-striped table-hover'>
          <thead className='table-dark'>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>
                  {order.customerName}<br />
                  <small className='text-muted'>{order.phoneNumber}</small>
                </td>
                <td>{formatItems(order.items)}</td>
                <td>${order.grandTotal}</td>
                <td>{order.paymentMethod}</td>
                <td>
                  <span>
                    {status(order.paymentMethod)}
                  </span>
                </td>
                <td>{formatDate(order.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderHistory;

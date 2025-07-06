import axios from 'axios';

export const createOrders=async(order)=>{return await
    axios.post("http://localhost:8080/orders",order,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
}
export const latestOrders=async ()=>{
    return await axios.get("http://localhost:8080/orders/latest",{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
}

export const deleteOrders=async(id)=>{
    return axios.delete(`http://localhost:8080/orders/${id}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
}
import toast from 'react-hot-toast';
import UserForm from '../../Components/UserForm/UserForm';
import UserList from '../../Components/UserList/UserList';
import './ManageUsers.css';
import { useEffect, useState } from 'react';
import { fetchUsers } from '../../service/UserService';
function ManageCat() {
  const[users,setUsers]=useState([]);
  const[loading,setLoading]=useState(false);

  useEffect(()=>{
    async function loadUsers(){
      try{
        setLoading(true);
        const response=await fetchUsers();
        setUsers(response.data);
      }catch(error){
        toast.error("error fetching users");
        console.error(error);
      }finally{
        setLoading(false);
      }
    }
    loadUsers();
  },[]);
  return (
    <div className='users-container text-light'>
      <div className='left-column'>{<UserForm setUsers={setUsers}/>}</div>
      <div className='right-column'>{<UserList users={users} setUsers={setUsers}/>}</div>

    </div>
  )
}

export default ManageCat

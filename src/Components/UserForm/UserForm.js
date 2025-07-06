import { useState } from "react"
import { addUser } from "../../service/UserService";
import toast from "react-hot-toast";
function UserForm({setUsers}) {
  const[loading,setLoading]=useState(false);
  const[data,setData]=useState({
    name:"",
    email:"",
    password:"",
    role:"ROLE_USER"
  });
  const onChangeHandler=(e)=>{
  const name=e.target.name;
  const value=e.target.value;
  setData((data)=>({
    ...data,
    [name]:value
  })
  )};
  const onSubmitHandler=async(e)=>{
    e.preventDefault();
    setLoading(true);
    try{
      const response=await addUser(data);
      if(response.status===201){
      setUsers((data)=>[...data,response.data]);
      toast.success("User added successfully");
      setData({
        name:"",
        email:"",
        password:"",
        role:"ROLE_USER"
      })}
    }catch(error){
      console.error(error);
      toast.error("Error adding User");
    }finally{
      setLoading(false);
    }
  }
  return (
        <div className="mx-2 mt-2">
      <div className="row">
        <div className="card form-container col-md-12">
            <div className="card-body">
                <form onSubmit={onSubmitHandler}>
                    <div className="mb-2">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input 
                        type="text"
                         className="form-control" 
                         id="name"
                          name="name"
                           placeholder="John Doe" 
                           onChange={onChangeHandler}
                           value={data.name}
                           />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                        type="email"
                         className="form-control"
                          id="email" 
                          name="email"
                           placeholder="john@exapmle.com" 
                           value={data.email}
                           onChange={onChangeHandler}
                           />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input 
                        type="password"
                         className="form-control"
                          id="password" 
                          name="password" 
                          placeholder="***********" 
                          value={data.password}
                          onChange={onChangeHandler}
                          />
                    </div>
                    
                    <button type="submit" className="btn btn-warning w-100" disabled={loading}>{loading ? "loading...":"Save"}</button>
                </form>
            </div>
        </div>
      </div>
    </div>

  )
}

export default UserForm

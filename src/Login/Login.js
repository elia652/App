import toast from 'react-hot-toast';
import './Login.css';
import { useContext, useState } from 'react';
import { login } from '../service/AuthService';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
function Login() {
    const {setAuthData}=useContext(AppContext);
    const navigate=useNavigate();
    const[loading,setLoading]=useState(false);
    const[data,setData]=useState({
        email:"",
        password:""
    });
    const onChangeHandler=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setData((data)=>({
            ...data,
            [name]:value
        }))
    };


    const onSubmitHandler=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try{
            const response=await login(data);
            if(response.status===200){
                toast.success("You are logged in");
                localStorage.setItem("token",response.data.token);
                  localStorage.setItem("role",response.data.role);
                  setAuthData(response.data.token,response.data.role);
                  navigate("/dashboard");
            }
        }catch(error){
            console.error(error);
            toast.error("Email or Password invalid")
        }finally{
            setLoading(false);
        }
    }
  return (
  <div className='bg-light d-flex align-items-center justify-content-center vh-100 login-background'>
        <div className='card shadow-lg w-100' style={{maxWidth:"480px"}}>
            <div className='card-body'>
                <div className='text-center'>
                    <h1 className='card-title h3'>Sign in</h1>
                    <p className="card-text text-muted">Sign in below to access your account</p>
                </div>
                <div className='mt-4'>
                    <form onSubmit={onSubmitHandler}>
                        <div className='mb-4'>
                            <label htmlFor='email' className='text-muted'>Email address</label>
                            <input type="email"
                             className='form-control'
                              id='email'
                               name='email'
                                placeholder='yoourname@example'
                                value={data.email}
                                onChange={onChangeHandler}
                                />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='password' className='text-muted'>Password</label>
                            <input type="password"
                             className='form-control'
                              id='password' 
                              name='password' 
                              placeholder='*********'
                              value={data.password}
                              onChange={onChangeHandler}
                              />
                        </div>
                        <div className='d-grid'>
                            <button type='submit' className='btn-dark btn-lg btn'>
                                Sign in
                            </button>
                        </div>
                    </form>
                    <Link to="/signup" className="nav-link"><p className="signup">Don't have an account?<br/>SignUp</p></Link>
                </div>
            </div>
        </div>
      
    </div>

  )
}

export default Login;

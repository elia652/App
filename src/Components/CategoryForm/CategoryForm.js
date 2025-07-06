import {useEffect, useState}from 'react';
import {assets} from '../../assets/assets';
import toast from 'react-hot-toast';
import { addCategory } from '../../service/CategoryService';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';
function CategoryForm() {
  const {setCategories,categories}=useContext(AppContext);
    const[loading, setLoading] = useState(false);
  const [img,setImg] = useState(false);
  const [data,setData] = useState({
    name: '',
    description: '',
    bgColor: '#2c2c2',
  });
  const onChangeHandler=(e)=>{
   const name=e.target.name;
    const value=e.target.value;
    setData((prev)=>({
      ...prev,
      [name]: value
    }))
  };

    const onSubmitHandler=async(e)=>{  
    e.preventDefault();
    if(!img){
      toast.error('Please select an image');
      return;
    }
        setLoading(true);

    const formData=new FormData();
    formData.append('category', JSON.stringify(data));
    formData.append('file', img);
    try{
      const response=await addCategory(formData);
      if(response.status===201){
        setCategories([...categories, response.data]);
        toast.success('Category added successfully');
        setData({
          name: '',
          description: '',
          bgColor: '#2c2c2',
        });
        setImg(false);
      }
    }catch(err){
      console.error(err);
      toast.error('Failed to add category');
    }finally{
      setLoading(false);
    }
    }
  return (
    <div className="mx-2 mt-2">
      <div className="row">
        <div className="card form-container col-md12">
            <div className="card-body">
                <form onSubmit={onSubmitHandler}>
                    <div className="mb-2">
                        <label htmlFor="image" className="form-label">
                            <img src={img ? URL.createObjectURL(img):assets.logo2} alt="" width={48}/></label>
                        <input 
                        type="file" className="form-control" id="image" name="image" onChange={(e)=>setImg(e.target.files[0])} hidden />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input 
                        type="text"
                         className="form-control"
                          id="name" 
                          name="name" 
                          value={data.name}
                          onChange={onChangeHandler}
                          placeholder="Category Name" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="description" className="form-label">description</label>
                        <textarea 
                        rows={5}
                        style={{maxHeight: '100px'}}
                         className="form-control"
                          id="description" 
                          name="description"
                          value={data.description}
                          onChange={onChangeHandler}
                           placeholder="Write content here.." />
                    </div>
                     <div className="mb-2">
                        <label htmlFor="bgColor" className="form-label">Background Color</label><br/>
                        <input 
                        type="color"
                         id="bgColor" 
                          name="bgColor" 
                          placeholder="#ffffff"
                          value={data.bgColor}
                          onChange={onChangeHandler} />
                    </div>
                    <button type="submit" className="btn btn-warning w-100"
                    disabled={loading}>
                      {loading ? 'Loading...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryForm

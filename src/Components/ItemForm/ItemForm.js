import { useContext, useState } from "react"
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { addItem } from "../../service/ItemService";
import toast from "react-hot-toast";
function ItemForm() {
  const{categories,setItemsData,itemData,setCategories}=useContext(AppContext);
  const [image,setImage]=useState(false);
  const [loading,setLoading]=useState(false);
    const [img,setImg] = useState(false);

  const[data,setData]=useState({
    name:"",
    categoryId:"",
    price:"",
    description:""
  });
  const onChangeHandler=(e)=>{
   const name=e.target.name;
   const value=e.target.value;
   setData((data)=>({
    ...data,
    [name]:value
   }))
  }
    const onSubmitHandler=async(e)=>{  
    e.preventDefault();
    setLoading(true);

    const formData=new FormData();
    formData.append('item', JSON.stringify(data));
    formData.append('file', img);
    try{
     if(!image){
      toast.error("Select an image");
      return;
     }
     const response=await addItem(formData);
     if(response.status===201){
      setItemsData([...itemData, response.data]);
      setCategories((cat)=>
      cat.map((category)=>category.categoryId===data.categoryId ? {category,items:category.items+1}:category));
      toast.success("Item added successfully");
      setData({
        name:"",
        categoryId:"",
        price:"",
        description:""
      })
      setImage(false);
     }else{
      toast.error("Unable to add item");
     }
    }catch(err){
       console.log(err);
      toast.error('Failed to add item,there is an error');
    }finally{
      setLoading(false);
    }
    }  
    return (
    <>
    <div className="item-form-container" style={{height:"100vh",overflowY:"auto",overflowX:"hidden"}}></div>
       <div className="mx-2 mt-2">
      <div className="row">
        <div className="card form-container col-md-8">
            <div className="card-body">
                <form  onSubmit={onSubmitHandler}>
                    <div className="mb-1">
                        <label htmlFor="image" className="form-label">
                            <img src={img ? URL.createObjectURL(img):assets.logo2} alt="" width={48}/></label>
<input
  type="file"
  className="form-control"
  id="image"
  name="image"
  hidden
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file);        // For preview
      setImage(true);      // For validation
    }
  }}
/>
                    </div>
                    <div className="mb-1">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input 
                        type="text"
                         className="form-control"
                          id="name" 
                          name="name"
                          value={data.name}
                          onChange={onChangeHandler} 
                          placeholder="Item Name" />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="categoryId" className="form-label">Category</label>
                        <select name="categoryId" id='category' className="form-control"
                        value={data.categoryId}
                     onChange={onChangeHandler}>
                          <option value="">~~Select Category~~</option>
                         {categories.map((category,i)=> {
                          
                          return <option key={i} value={category.categoryId}>{category.name}</option>
                         })}
                        </select>
                    </div>
                    <div className="mb-1">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input 
                        type="number"
                         onChange={onChangeHandler} 
                         value={data.price}
                         className="form-control"
                          id="price" 
                          name="price" 
                          placeholder="$200.0" />
                    </div>
                     <div className="mb-1">
                        <label htmlFor="bgColor" className="form-label">Description</label><br/>
                        <textarea
                        className="form-control"    
                        rows={3}
                        style={{maxHeight:"80px"}}  
                         onChange={onChangeHandler} 
                         value={data.description}                  
                          name="description"
                          id="description"
                          />
                    </div>
                    <button type="submit" className="btn btn-warning w-100" disabled={loading}>{loading ? "Loading...":"Submit"}</button>
                </form>
            </div>
        </div>
      </div>
    </div>
</>
  )
}

export default ItemForm

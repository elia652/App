import { useContext, useState } from "react"
import { AppContext } from "../../context/AppContext";
import { deleteItem } from "../../service/ItemService";
import toast from "react-hot-toast";
import './ItemsList.css';

function ItemsList() {
  const{itemData,setItemsData}=useContext(AppContext);
  const[searcTerm,setSearchTem]=useState("");

    const filteredItems = itemData.filter(item =>
    item.name.toLowerCase().includes(searcTerm.toLowerCase())
  );

  const removeItem=async(itemId)=>{
    try{
      const response=await deleteItem(itemId);
      if(response.status===204){
        const updatedItems=itemData.filter(item=>item.itemId !== itemId);
        setItemsData(updatedItems);
        toast.success("Item deleted");
      }else{
        toast.error("Unable deleting item")
      }
    }catch(error){
      console.error(error);
      toast.error("There is something wrong");
    }
  }
  return (
   <div className='category-list-container' style={{height:"100vh",overflowY:"auto",overflowX:"hidden"}}>
      <div className='row pe-2'>
        <div className='input-group mb-3'>
          <input type='text'
           name="keyword" 
           placeholder='Search with keyword'
            className='form-control'
            onChange={(e)=>setSearchTem(e.target.value)}
            value={searcTerm}
            />
          <span className='input-group-text bg-warning'>
            <i className='bi bi-search'></i>
             </span>
        </div>
      </div>
     <div className="row g-3 pe-2">
       {filteredItems.map((item,index) => (
       <div className="col-12" key={index}>
        <div className="bg-dark card p-3">
          <div className="d-flex align-items-center">
            <div className="item-image">
              <img src={`http://localhost:8080/uploads/${item.imgUrl}`}alt={item.name} className="item-image"/>
            </div>
            <div className="flex-grow-1">
              <h6 className="mb-1 text-white">{item.name}</h6>
              <p className="mb-0 text-white">
                Category:{item.categoryName}
              </p>
              <span className="mb-0 text-block badge rounded-pill text-bg-warning">${item.price}</span>
            </div>
          </div>
          <button className="btn btn-danger btn-sm" onClick={()=>removeItem(item.itemId)}>
            <i className="bi bi-trash"></i>
          </button>
        </div>
       </div>
       ))}
      </div>

    </div>  )
}

export default ItemsList

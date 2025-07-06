import {useContext,useState} from 'react';
import './CategoryList.css';
import { AppContext } from '../../context/AppContext';
import { deleteCategory } from '../../service/CategoryService';
import toast from 'react-hot-toast';

function CategoryList() {

  const {categories,setCategories}= useContext(AppContext);
  const[searcTem,setSearchTem]=useState('');
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searcTem.toLowerCase())
  );

  const deleteCategoryByCategoryId = async (categoryId) => {
    try {
    const reponse=  await deleteCategory(categoryId);
    if(reponse.status===204){
     const updatedCategories= categories.filter(category=>category.categoryId !== categoryId);
     setCategories(updatedCategories);
     toast.success('Category deleted successfully');
    }else{
      toast.error('Failed to delete category');
    }
     
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('An error occurred while deleting the category');
    }
  }
  return (
    <div className='category-list-container'>
      <div className='row pe-2'>
        <div className='input-group mb-3'>
          <input type='text'
           name="keyword" 
           placeholder='Search with keyword'
            className='form-control'
            onChange={(e)=>setSearchTem(e.target.value)}
            value={searcTem}
            />
          <span className='input-group-text bg-warning'>
            <i className='bi bi-search'></i>
             </span>
        </div>
      </div>
     <div className="row g-3 pe-2">
       {filteredCategories.map((category) => (
        <div key={category.categoryId}className='col-12'>
        <div  className='card p-3' style={{backgroundColor:category.bgColor}}>
          <div className='d-flex align-items-center'>
            <div style={{marginRight:'15px'}}>
<img 
  src={`http://localhost:8080/uploads/${category.imgUrl}`} 
  alt={category.name} 
  style={{width:'100px',height:'100px'}}
  className='category-image' 
/>            </div>
            <div className="flex-grow-1">
              <h5 className="mb-1 text-white">{category.name}</h5>
              <p className="mb-0 text-white">{category.items}Items</p>
            </div>
          </div>
          <button className='btn btn-danger btn-sm'
            onClick={() => {deleteCategoryByCategoryId(category.categoryId)}}>
            <i className="bi bi-trash"></i>
          </button>
        </div>
        </div>
       ))}
      </div>

    </div>
  )
}

export default CategoryList



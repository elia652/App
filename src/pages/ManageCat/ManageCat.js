import CategoryForm from '../../Components/CategoryForm/CategoryForm';
import CategoryList from '../../Components/CategoryList/CategoryList';
import './ManageCat.css';
function ManageCat() {
  return (
    <div className='category-container text-light'>
      <div className='left-column'>{<CategoryForm/>}</div>
      <div className='right-column'>{<CategoryList/>}</div>

    </div>
  )
}

export default ManageCat

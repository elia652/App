import './ManageItems.css';
import ItemForm from '../../Components/ItemForm/ItemForm';
import ItemsList from '../../Components/ItemsList/ItemsList';
function ManageCat() {
  return (
    <div className='items-container text-light'>
      <div className='left-column'>{<ItemForm/>}</div>
      <div className='right-column'>{<ItemsList/>}</div>

    </div>
  )
}

export default ManageCat

import './CustomerForm.css';

function CustomerForm({mobileNumber,customerName,setCustomerName,setMobileNumber}) {
  return (
    <div className='p-3' style={{fontSize:"14px",marginTop:"-20px"}}>
      <div className='mb-3'>
        <div className='d-flex align-items-center gap-2'>
          <label htmlFor='customerName' className='col-4'>Customer Name</label>
          <input type='text' className="form-control form-control-sm" id="customerName" style={{fontSize:"12px"}} onChange={(e)=>setCustomerName(e.target.value)}value={customerName}/>
        </div>
      </div>
            <div className='mb-3'>
        <div className='d-flex align-items-center gap-2'>
          <label htmlFor='mobileNumber' className='col-4'>Mobile Number</label>
          <input type='number' className="form-control form-control-sm" id="mobileNumber" style={{fontSize:"12px"}} onChange={(e)=>setMobileNumber(e.target.value)} value={mobileNumber}/>
        </div>
        </div>
    </div>
  )
}

export default CustomerForm

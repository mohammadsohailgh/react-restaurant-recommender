// import { useDispatch } from 'react-redux'
// import { deleteGoal } from '../features/orders/orderSlice'

function OrderItem({ order }) {
  // const dispatch = useDispatch()

  return (
    <div className='order'>
      <div>{new Date(order.createdAt).toLocaleString('en-US')}</div>
      <h2>{order.text}</h2>
      {/* <button onClick={() => dispatch(deleteGoal(order._id))} className='close'> */}
        {/* X */}
      {/* </button> */}
    </div>
  )
}

export default OrderItem
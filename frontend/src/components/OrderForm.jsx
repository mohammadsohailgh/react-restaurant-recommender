import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createOrder} from '../features/orders/orderSlice'

function OrderForm() {
    const [text, setText] = useState('')
    
    const dispatch = useDispatch()

    const onSubmit = e => {
      e.preventDefault()

      dispatch(createOrder(({text})))
      setText('')
    }

    return (
    <section className='form'>
        <form onSubmit = {onSubmit}>
            <div className="form-group">
            <label htmlFor="text">Order</label>
            <input type="text" 
            name="text" 
            id="text" 
            value={text} 
            onChange={(e) => setText(e.target.value)} />
            </div>
            <div className="form-group">
                <button className="btn-one btn-block" type='submit'>
                    Add order
                </button>
            </div>
        </form>
    </section>
    )
}

export default OrderForm